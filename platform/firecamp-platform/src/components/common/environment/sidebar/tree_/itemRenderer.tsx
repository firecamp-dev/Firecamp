import cx from 'classnames';
import { Braces, Lock, Trash2 } from 'lucide-react';
import { Button } from '@firecamp/ui';

export default {
  renderItemArrow: ({ item, context }) => {
    return <Braces className=" flex-none" size={18} opacity={1} />;
    // return (
    //   <>
    //     {item.data.__meta.visibility == 2 ? (
    //       <Lock className="flex-none" size={18} opacity={1} />
    //     ) : (
    //       <></>
    //     )}
    //   </>
    // );
  },

  renderItemTitle: ({ item, title, context, info }) => {
    // console.log(title, "title...")
    if (!info.isSearching || !context.isSearchMatching) {
      return (
        <>
          {title} - {item.children?.length}
        </>
      );
    } else {
      const startIndex = title
        .toLowerCase()
        .indexOf(info.search!.toLowerCase());
      return (
        <>
          {startIndex > 0 && <span>{title.slice(0, startIndex)}</span>}
          <span className="rct-tree-item-search-highlight">
            {title.slice(startIndex, startIndex + info.search!.length)}
          </span>
          {startIndex + info.search!.length < title.length && (
            <span>
              {title.slice(startIndex + info.search!.length, title.length)}
            </span>
          )}
        </>
      );
    }
  },

  renderItem: ({
    item,
    depth,
    children,
    title,
    context,
    arrow,
    info,
    openEnv,
    openCreateEnv,
    deleteEnv,
  }) => {
    const renderDepthOffset = 8;
    const InteractiveComponent = context.isRenaming ? 'div' : 'button';
    const type = context.isRenaming ? undefined : 'button';
    // TODO have only root li component create all the classes
    return (
      <li
        {...(context.itemContainerWithChildrenProps as any)}
        className={cx(
          'relative',
          'rct-tree-item-li',
          { 'rct-tree-item-li-isFolder': item.isFolder },
          { 'rct-tree-item-li-selected': context.isSelected },
          { 'rct-tree-item-li-expanded': context.isExpanded },
          { 'rct-tree-item-li-focused': context.isFocused },
          { 'rct-tree-item-li-dragging-over': context.isDraggingOver },
          { 'rct-tree-item-li-search-match': context.isSearchMatching }
        )}
      >
        <div
          {...(context.itemContainerWithoutChildrenProps as any)}
          style={{
            paddingLeft: `${
              (depth + 1) * renderDepthOffset + depth * renderDepthOffset
            }px`,
          }}
          className={cx(
            'pr-2',
            'rct-tree-item-title-container',
            { 'rct-tree-item-title-container-isFolder': item.isFolder },
            {
              'rct-tree-item-title-container-selected !opacity-100':
                context.isSelected,
            },
            {
              'rct-tree-item-title-container-expanded !opacity-100':
                context.isExpanded,
            },
            {
              'rct-tree-item-title-container-focused !opacity-100':
                context.isFocused,
            },
            {
              'rct-tree-item-title-container-dragging-over':
                context.isDraggingOver,
            },
            {
              'rct-tree-item-title-container-search-match':
                context.isSearchMatching,
            }
          )}
        >
          {context.isExpanded && item.isFolder && (
            <span
              className="rct-tree-line absolute top-5 bottom-0 border-r border-app-foreground-inactive z-10 opacity-50"
              style={{ paddingLeft: `${renderDepthOffset - 3}px` }}
            ></span>
          )}
          <span
            className={cx(
              'rct-tree-line horizontal absolute top-3 h-px bg-app-foreground-inactive z-10 w-2 opacity-50',
              { '!top-4': item.data.__ref.isRequest }
            )}
            style={{ left: `${renderDepthOffset * 2 - 3}px` }}
          />
          {arrow}
          <InteractiveComponent
            type={type}
            {...(context.interactiveElementProps as any)}
            className={cx(
              'pl-1 whitespace-pre overflow-hidden text-ellipsis rct-tree-item-button',
              { 'rct-tree-item-button-isFolder': item.isFolder },
              { 'rct-tree-item-button-selected': context.isSelected },
              { 'rct-tree-item-button-expanded': context.isExpanded },
              { 'rct-tree-item-button-focused': context.isFocused },
              { 'rct-tree-item-button-dragging-over': context.isDraggingOver },
              { 'rct-tree-item-button-search-match': context.isSearchMatching }
            )}
          >
            <span className="w-full overflow-hidden text-ellipsis items-center block">
              {title}

              {item.data.__ref?.isCollection || item.data.__ref?.isWorkspace ? (
                <span className={'text-sm'}>- {item.children?.length}</span>
              ) : (
                <></>
              )}
            </span>
          </InteractiveComponent>
          <div className="flex ml-auto rct-tree-item-li-action items-center">
            {/* <Braces size={14} className="ml-1" onClick={(e)=> {
                e.preventDefault()
                e.stopPropagation()
                openEnv(item.index);
                console.log(1234)
              }}/> */}

            <Button
              text={'Open'}
              classNames={{
                root: 'hover:!bg-focusColor !text-app-foreground-inactive',
              }}
              {...context.interactiveElementProps}
              onClick={(e) => {
                // e.preventDefault();
                // e.stopPropagation();
                context.focusItem(item.data.__ref.id);
                openEnv(item.data);
              }}
              size='compact-xs'
              ghost
            />

            {item.data.__ref.isEnvironment ? (
              <Trash2
                className="ml-1 cursor-pointer"
                size={14}
                onClick={() => {
                  deleteEnv(item.index);
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {children}
      </li>
    );
  },
};
