import { FC, useState } from 'react';
import { Info } from 'lucide-react';
import { Input, TabHeader, Button, Container, TextArea } from '@firecamp/ui';
import { _object } from '@firecamp/utils';
import { ICollection, IFolder } from '@firecamp/types';

const EditInfo: FC<IProps> = ({
  entityType = 'collection',
  entity,
  isRequesting,
  isNameChanged,
  isDescriptionChanged,
  onUpdate,
  onChange,
}) => {
  const { name, description } = entity;
  const [error, setError] = useState({ name: '' });
  const _handleChange = (e) => {
    if (e) e.preventDefault();
    const { name, value } = e.target;
    if (name === 'name' && error.name) setError({ name: '' });
    onChange(name, value);
  };
  const _onUpdate = async (e) => {
    if (e) e.preventDefault;
    if (!name || name.length < 3) {
      setError({ name: `The name must have minimum 3 characters` });
      return;
    }
    const updates: any = {};
    if (isNameChanged) updates.name = name;
    if (isDescriptionChanged) updates.description = description;

    if (updates.name || updates.description) onUpdate(updates);
  };

  return (
    <Container className="with-divider h-full">
      <Container.Body className="padding-wrapper">
        <div className="p-6 flex-1 flex flex-col">
          <label className="text-sm font-semibold leading-3 block text-app-foreground-inactive uppercase w-full relative mb-2">
            {`UPDATE ${
              entityType === 'collection' ? 'COLLECTION' : 'FOLDER'
            } INFO`}
          </label>
          <div className="mt-4">
            <Input
              autoFocus={true}
              label="Name"
              placeholder={`${
                entityType === 'collection' ? 'Collection' : 'folder'
              } name`}
              name={'name'}
              defaultValue={name || ''}
              onChange={_handleChange}
              onKeyDown={() => {}}
              onBlur={() => {}}
              error={error.name}
              // error={error.name}
              // rightSection={<VscEdit />}
            />
          </div>

          <TextArea
            minRows={8}
            label="Description (optional)"
            placeholder="Description"
            name={'description'}
            defaultValue={description || ''}
            onChange={_handleChange}
          />
          <div className="mb-3 text-xs flex items-center justify-start text-app-foreground">
            <Info size={14} className="pr-1" />
            Markdown supported in description
          </div>
        </div>
      </Container.Body>
      <Container.Footer className="py-3">
        <TabHeader>
          <TabHeader.Right>
            {/* <Button
              text="Cancel"
              onClick={() => {}}
              transparent
              secondary
              ghost
              xs
            /> */}
            <Button
              text={isRequesting ? 'Updating Info...' : 'Update Info'}
              onClick={_onUpdate}
              disabled={
                (!isNameChanged && !isDescriptionChanged) || isRequesting
              }
              primary
              xs
            />
          </TabHeader.Right>
        </TabHeader>
      </Container.Footer>
    </Container>
  );
};
export default EditInfo;

interface IProps {
  entityType: 'collection' | 'folder';
  entity: ICollection | IFolder;
  isRequesting?: boolean;
  isNameChanged: boolean;
  isDescriptionChanged: boolean;
  onUpdate: (updates: { [key: string]: string }) => void;
  onChange: (key: string, value: any) => void;
}
