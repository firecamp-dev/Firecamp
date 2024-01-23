import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import cx from 'classnames';
import { VscTriangleDown } from '@react-icons/all-files/vsc/VscTriangleDown';
import { ChevronRight, SendHorizonal } from 'lucide-react';
import {
  Button,
  Dropdown,
  DropdownMenu,
  StatusBar,
  ToolBar,
} from '@firecamp/ui';
import EditPlaygroundName from './EditPlaygroundName';
import { IStore, useStore } from '../../../../../store';
import { isValid } from '../../../../../services/graphql.service';

const ReqStatusBar = ({ }) => {
  const {
    context,
    isRequestSaved,
    playground,
    playgroundMeta,
    undoPlaygroundChanges,
    updateItem,
    setPlaygroundOperation,
    execute,
    getPlgNameSuggestion,
    savePlg,
  } = useStore(
    (s: IStore) => ({
      context: s.context,
      isRequestSaved: s.runtime.isRequestSaved,
      playground: s.playgrounds[s.runtime.activePlayground],
      playgroundMeta: s.runtime.playgroundsMeta[s.runtime.activePlayground],
      undoPlaygroundChanges: s.undoPlaygroundChanges,
      updateItem: s.updateItem,
      setPlaygroundOperation: s.setPlaygroundOperation,
      execute: s.execute,
      getPlgNameSuggestion: s.prepareRuntimeActivePlgName,
      savePlg: s.addItem,
    }),
    shallow
  );
  const [isOpen, toggleOpen] = useState(false);

  const plgOperations = playgroundMeta.operationNames.map((n) => ({ name: n })); //[{ name: 'MyCompany', __meta: { type: 'q' } }];
  const currentOps = playgroundMeta.activeOperation
    ? { name: playgroundMeta.activeOperation }
    : plgOperations[0];

  const onSelectOperation = (operation: { name: string }) => {
    setPlaygroundOperation(operation.name, playground.request.__ref.id);
  };

  const _savePlg = async () => {
    if (!isRequestSaved) {
      context.app.notify.info('Please save the graphql request first.');
      return;
    }
    const isQueryValid = await isValid(playground.request.value.query);
    if (isQueryValid == false) {
      context.app.notify.alert('The playground query is not valid.');
      return;
    }
    const plgName = getPlgNameSuggestion();
    context.window
      .promptInput({
        title: 'SAVE PLAYGROUND',
        value: plgName,
        validator: (value) => {
          const name = value.trim();
          if (!name) {
            return {
              isValid: false,
              message: 'The playground name is required',
            };
          } else if (name?.length <= 3) {
            return {
              isValid: false,
              message: 'The playground name must have minimum 3 characters',
            };
          } else {
            return { isValid: true, message: '' };
          }
        },
        executor: (plgName) => {
          return savePlg(plgName);
        },
      })
      .then((res) => {
        // console.log(res)
      });
  };

  const _execute = async () => {
    const isQueryValid = await isValid(playground.request.value.query);
    // console.log(isQueryValid, 'isQueryValid...');
    if (isQueryValid == false) {
      context.app.notify.alert('The playground query is not valid.');
      return;
    }
    execute(
      currentOps.name,
      playground.request.value.query,
      playground.request.value.variables
    );
  };

  return (
    <>
      <StatusBar className="fc-statusbar large">
        {/* <StatusBar.PrimaryRegion> */}
        <div className="flex items-center whitespace-pre overflow-hidden text-ellipsis text-app-foreground-inactive">
          {/* root */}
          {/* <ChevronRight /> */}
          ./{playground.request.name}
          <ToolBar className="ml-2 visible">
            {playgroundMeta.isSaved ? <EditPlaygroundName /> : <></>}
          </ToolBar>
        </div>
        <div className="flex ml-auto mr-1">
          <DropdownMenu
            handler={() => (
              <Button
                text={currentOps?.name || ''}
                classNames={{
                  root: '!rounded-br-none !rounded-tr-none',
                }}
                rightSection={
                  <VscTriangleDown
                    size={12}
                    className={cx({ 'transform rotate-180': isOpen })}
                  />
                }
                animate={false}
                size='compact-xs'
                secondary
              />
            )}
            options={plgOperations || []}
            onSelect={onSelectOperation}
            onOpenChange={(v) => toggleOpen(v)}
            classNames={{
              dropdown: '-mt-2 min-w-fit',
            }}
            menuProps={{
              position: 'bottom-start',
            }}
            width={144}
            sm
          />
          <Button
            // TODO: add class opacity and square
            leftSection={<SendHorizonal size={12}/>}
            onClick={_execute}
            classNames={{
              root: '!rounded-bl-none !rounded-tl-none',
            }}
            // disabled={_object.isEmpty(getPlaygroundQueries())}
            animate={false}
            size='compact-xs'
            primary
          />
        </div>
        {/* </StatusBar.PrimaryRegion> */}
      </StatusBar>

      <StatusBar className="pr-1">
        <StatusBar.SecondaryRegion>
          {playgroundMeta.hasChange && playgroundMeta.isSaved ? (
            <>
              <Button
                text="Undo changes"
                onClick={() =>
                  undoPlaygroundChanges(playground.request?.__ref.id)
                }
                size='compact-xs'
                ghost
                
              />
              <Button
                text="Save changes"
                onClick={(e) => updateItem()}
                size='compact-xs'
                ghost
              />
            </>
          ) : (
            <></>
          )}
          {!playgroundMeta.isSaved ? (
            <Button
              text="Save playground"
              onClick={_savePlg}
              size='compact-xs'
              ghost
            />
          ) : (
            <></>
          )}
        </StatusBar.SecondaryRegion>
      </StatusBar>
    </>
  );
};

export default ReqStatusBar;
