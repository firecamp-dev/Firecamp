import {
  FilePlus2,
  FolderPlus,
  MoreHorizontal,
  Pencil,
  Settings,
  Trash2,
  CopyPlus
} from 'lucide-react';
import { DropdownMenu } from '@firecamp/ui';
import { Regex } from '../../../../constants';
import platformContext from '../../../../services/platform-context';
import { useExplorerStore } from '../../../../store/explorer';

enum EMenuType {
  Collection = 'collection',
  Folder = 'folder',
  Request = 'request',
}

const CollectionMenu = ({
  collectionId,
  folderId,
  requestId,
  startRenaming,
  menuType,
  methodType
}) => {
  const {
    openCollectionTab,
    openFolderTab,
    createFolder,
    deleteCollection,
    deleteFolder,
    deleteRequest,
    startDuplicate
  } = useExplorerStore.getState();

  const renameMenu = {
    prefix: () => <Pencil size={14} />,
    name: 'Rename',
    onClick: (e) => {
      startRenaming();
    },
  }; 

  const duplicateMenu = {
    prefix: () => <CopyPlus size={14} />,
    name: 'Duplicate',
    onClick: () => {
      startDuplicate(requestId)
    },
  };

  const addFolderMenu = {
    prefix: () => <FolderPlus size={14} />,
    name: 'Add Folder',
    onClick: () => {
      console.log(collectionId, folderId);
      if (!platformContext.app.user.isLoggedIn()) {
        return platformContext.app.modals.openSignIn();
      }
      platformContext.window
        .promptInput({
          title: 'Create New Folder',
          label: 'Folder Name',
          placeholder: 'type folder name',
          btnLabels: { oking: 'Creating...' },
          value: '',
          validator: (val) => {
            if (!val || val.length < 3) {
              return {
                isValid: false,
                message: 'The folder name must have minimum 3 characters.',
              };
            }
            const isValid = Regex.FolderName.test(val);
            return {
              isValid,
              message:
                !isValid &&
                'The folder name must not contain special characters.',
            };
          },
          executor: (name) => {
            const _folder = {
              name,
              description: '',
              __ref: { collectionId, folderId },
            };
            return createFolder(_folder);
          },
          onError: (e) => {
            platformContext.app.notify.alert(
              e?.response?.data?.message || e.message
            );
          },
        })
        .then((res) => {
          // console.log(res);
        });
    },
  };

  const addRequestMenu = {
    prefix: () => <FilePlus2 size={14} />,
    name: 'Add Request',
    onClick: () => {},
  };

  const openEnv = (env) => {};

  const viewDetailMenu = {
    prefix: () => <Settings size={14} />,
    name: 'View Details',
    onClick: () => {
      if (menuType == EMenuType.Collection) {
        openCollectionTab(collectionId);
      } else if (menuType == EMenuType.Folder) {
        openFolderTab(folderId);
      }
    },
  };

  const deleteMenu = {
    prefix: () => <Trash2 size={14} />,
    name: 'Delete',
    onClick: () => {
      platformContext.window
        .confirm({
          message: `Are you sure to delete the ${menuType}?`,
          labels: { confirm: 'Yes, delete it.' },
        })
        .then((isConfirmed) => {
          if (isConfirmed) {
            if (menuType == EMenuType.Collection) {
              deleteCollection(collectionId);
            } else if (menuType == EMenuType.Folder) {
              deleteFolder(folderId);
            } else if (menuType == EMenuType.Request) {
              deleteRequest(requestId);
            }
          }
        });
    },
  };

  const commonMenu = [
    viewDetailMenu,
    renameMenu,
    addFolderMenu,
    // addRequestMenu,
    // settingMenu,
    deleteMenu,
  ];  
  let requestMenu = [renameMenu, deleteMenu];  
  if (methodType === "rest") {
    requestMenu.push(duplicateMenu);
  }
  return (
    <div>
      <DropdownMenu
        handler={() => <MoreHorizontal className="cursor-pointer " size={14} opacity={0.6}/>}
        options={menuType == EMenuType.Request ? requestMenu : commonMenu}
        width={144}
        onSelect={(value) => value.onClick()}
        classNames={{
          dropdown: 'shadow-modal-shadow shadow-[0_0_8px_2px_rgba(0,0,0,0.3)]',
          trigger: 'align-middle',
        }}
        sm
      />
    </div>
  );
};

export default CollectionMenu;