import { useState } from 'react';
import cx from 'classnames';
import { AppWindow, ArrowDown, Braces, Building, ChevronRight, File, Folder, LogIn, MoreHorizontal, Pencil, Plus, SendHorizonal, Twitter, Trash2, UserCircle2, UserPlus2 } from 'lucide-react';
import { AiOutlineUserSwitch } from '@react-icons/all-files/ai/AiOutlineUserSwitch';
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted';
import { VscMultipleWindows } from '@react-icons/all-files/vsc/VscMultipleWindows';
import { VscRemote } from '@react-icons/all-files/vsc/VscRemote';
import { VscTriangleDown } from '@react-icons/all-files/vsc/VscTriangleDown';

import { Button, FcHttp, DropdownMenu } from '@firecamp/ui';
import StatusBar from '../status-bar/StatusBar';

enum EMenuOptions {
  Request = 'request',
  Collection = 'collection',
  Environment = 'environment',
  ImportCollection = 'import-collection',
  Workspace = 'workspace',
  Organization = 'organization',
  InviteMembers = 'invite-members',
  SwitchOrg = 'switch-org',
  SwitchWorkspace = 'switch-workspace',
}

export default {
  title: 'UI-Kit/Dropdown/MantineDDMenu',
  component: DropdownMenu,
};

const Template = ({ ...args }: any) => <DropdownMenu {...args} />;

export const Example = Template.bind({});
Example.args = {
  options: [
    {
      id: EMenuOptions.Request,
      name: 'Request',
      prefix: () => <FcHttp size={18} />,
      postfix: () => <span className="text-inputPlaceholder">⌘K</span>,
    },
    {
      id: EMenuOptions.Collection,
      name: 'Collection',
      prefix: () => <Folder size={18} />,
    },
    {
      id: EMenuOptions.Environment,
      name: 'Environment',
      prefix: () => <Braces size={18} />,
    },
    {
      id: EMenuOptions.ImportCollection,
      name: 'Import Collection',
      showSeparator: true,
      prefix: () => <ArrowDown size={18} />,
    },

    {
      id: EMenuOptions.Workspace,
      name: 'Workspace',
      prefix: () => <AppWindow size={18} />,
    },
    {
      id: EMenuOptions.Organization,
      name: 'Organization',
      prefix: () => <Building size={18} />,
    },
    {
      id: EMenuOptions.InviteMembers,
      name: 'Invite Members',
      showSeparator: true,
      prefix: () => <UserPlus2 size={18} />,
    },
    {
      id: EMenuOptions.SwitchOrg,
      name: 'Switch Organization',
      prefix: () => <AiOutlineUserSwitch size={18} />,
    },
    {
      id: EMenuOptions.SwitchWorkspace,
      name: 'Switch Workspace',
      prefix: () => <VscMultipleWindows size={18} />,
    },
  ],
  header:
    <div className="!capitalize !pt-[0.2rem] !pb-2 !px-3 !block !bg-focus2 ">
      Header title
      <br />
      <div
        className={
          'text-sm font-light leading-3 text-app-foreground-inactive'
        }
      >
        User
      </div>
    </div>,
  footer: <div className='text-center'>3.0.0</div>,
  handler: () => <Button text={'Create'} primary ghost xs />,
  classNames: {
    dropdown: '-ml-[2px] pt-0',
  },
  onSelect: (value: any) => console.log(`selected item :`, value),
};

export const GlobalCreate = () => {
  const [selected, setSelected] = useState('');

  return (
    <DropdownMenu
      handler={() => (
        <Button
          text={selected || 'Create'}
          classNames={{ root: 'font-bold hover:!bg-focus1' }}
          primary
          ghost
          size='compact-xs'
        />
      )}
      options={[
        {
          id: 'CreateNewHeader',
          name: 'Create New',
          isLabel: true,
        },
        {
          id: EMenuOptions.Request,
          name: 'Request',
          prefix: () => <FcHttp size={18} />,
          postfix: () => <span className="text-inputPlaceholder">⌘K</span>,
        },
        {
          id: EMenuOptions.Collection,
          name: 'Collection',
          prefix: () => <Folder size={18} />,
        },
        {
          id: EMenuOptions.Environment,
          name: 'Environment',
          prefix: () => <Braces size={18} />,
        },
        {
          id: EMenuOptions.ImportCollection,
          name: 'Import Collection',
          showSeparator: true,
          prefix: () => <ArrowDown size={18} />,
        },
        {
          id: 'CreateNewByAdminHeader',
          name: 'Create New (By Admin)',
          isLabel: true,
        },

        {
          id: EMenuOptions.Workspace,
          name: 'Workspace',
          prefix: () => <AppWindow size={18} />,
        },
        {
          id: EMenuOptions.Organization,
          name: 'Organization',
          prefix: () => <Building size={18} />,
        },
        {
          id: EMenuOptions.InviteMembers,
          name: 'Invite Members',
          showSeparator: true,
          prefix: () => <UserPlus2 size={18} />,
        },
        {
          id: 'SwitchHeader',
          name: 'SWITCH',
          isLabel: true,
        },
        {
          id: EMenuOptions.SwitchOrg,
          name: 'Switch Organization',
          prefix: () => <AiOutlineUserSwitch size={18} />,
        },
        {
          id: EMenuOptions.SwitchWorkspace,
          name: 'Switch Workspace',
          prefix: () => <VscMultipleWindows size={18} />,
        },
      ]}
      onSelect={(value: any) => setSelected(value.name)}
      classNames={{
        dropdown: 'pt-0 pb-2 -ml-[2px]',
        label: 'uppercase',
      }}
    />
  );
};

export const HTTPMethod = () => {
  const [selected, setSelected] = useState('GET');

  return (
    <DropdownMenu
      handler={() => <Button text={selected} secondary xs />}
      selected={selected}
      options={[
        {
          id: 'GET',
          name: 'GET',
        },
        {
          id: 'POST',
          name: 'POST',
        },
        {
          id: 'PUT',
          name: 'PUT',
        },
        {
          id: 'DELETE',
          name: 'DELETE',
        },
        {
          id: 'PATCH',
          name: 'PATCH',
        },
        {
          id: 'HEAD',
          name: 'HEAD',
        },
        {
          id: 'OPTIONS',
          name: 'OPTIONS',
        },
        {
          id: 'PURGE',
          name: 'PURGE',
        },
        {
          id: 'LINK',
          name: 'LINK',
        },
        {
          id: 'UNLINK',
          name: 'UNLINK',
        },
      ]}
      onSelect={(value: any) => setSelected(value.name)}
      width={70}
      classNames={{
        dropdown: 'pt-0 pb-2 -mt-2',
      }}
      sm
    />
  );
};

export const BodyTab = () => {
  const [selected, setSelected] = useState('');

  return (
    <DropdownMenu
      handler={() => (
        <Button
          text={selected || 'None'}
          classNames={{ root: 'font-bold hover:!bg-focus1' }}
          ghost
          size='compact-xs'
          primary
        />
      )}
      options={[
        {
          id: 'FormAndQueryHeader',
          name: 'Form and query',
          isLabel: true,
        },
        {
          name: 'Multipart',
          id: 'multipart/form-data',
        },
        {
          name: 'Form URL Encode',
          id: 'application/x-www-form-urlencoded',
        },
        {
          id: 'RawHeader',
          name: 'Raw',
          isLabel: true,
        },
        {
          name: 'Json',
          id: 'application/json',
        },
        {
          name: 'Xml',
          id: 'application/xml',
        },
        {
          name: 'Text',
          id: 'text',
        },
        {
          id: 'OthersHeader',
          name: 'Others',
          isLabel: true,
        },
        {
          name: 'Binary',
          id: 'binary',
        },
        {
          name: 'None',
          id: 'none',
        },
      ]}
      selected={selected}
      onSelect={(value: any) => setSelected(value.name)}
      classNames={{
        dropdown: 'pt-0 pb-2 -mt-2',
        label: 'uppercase pl-2',
        item: '!px-4',
      }}
      width={144}
      sm
    />
  );
};

export const EmitterBody = () => {
  const [selected, setSelected] = useState('Text');

  return (
    <DropdownMenu
      handler={() => (
        <Button
          text={selected || 'No Body'}
          classNames={{ root: 'hover:!bg-focus1' }}
          primary
          ghost
          size='compact-xs'
        />
      )}
      options={[
        {
          id: 'Text',
          name: 'Text',
        },
        {
          id: 'Json',
          name: 'Json',
        },
        {
          id: 'Number',
          name: 'Number',
        },
        {
          id: 'Boolean',
          name: 'Boolean',
        },
        {
          id: 'NoBody',
          name: 'No body',
        },
      ]}
      onSelect={(value: any) => setSelected(value.name)}
      classNames={{
        dropdown: 'shadow-modal-shadow shadow-[0_0_8px_2px_rgba(0,0,0,0.3)] ',
      }}
      width={144}
      sm
    />
  );
};

export const Logs = () => {
  const [selected, setSelected] = useState('');

  return (
    <DropdownMenu
      handler={() => (
        <Button
          classNames={{ root: 'w-36 text-base' }}
          text={selected || 'select log type'}
          title={selected ? `Log type: ${selected || ''}` : ''}
          secondary
          xs
        />
      )}
      options={[
        {
          id: 'system',
          name: 'System',
        },
        {
          id: 'send',
          name: 'Send',
        },
        {
          id: 'receive',
          name: 'Receive',
        },
      ]}
      onSelect={(value: any) => setSelected(value.name)}
      classNames={{
        dropdown:
          'shadow-modal-shadow shadow-[0_0_8px_2px_rgba(0,0,0,0.3)] -mt-2 !py-0',
      }}
      width={144}
      sm
    />
  );
};

export const RequestStatusBar = () => {
  const [selected, setSelected] = useState('MyQuery');

  return (
    <div className="flex ml-auto mr-1">
      <DropdownMenu
        handler={() => (
          <Button
            text={selected}
            size='compact-xs'
            secondary
            classNames={{ root: 'leading-6 !rounded-br-none !rounded-tr-none' }}
          />
        )}
        options={[
          {
            id: 'my_query',
            name: 'MyQuery',
          },
          {
            id: 'my_query_1',
            name: 'MyQuery1',
          },
        ]}
        onSelect={(value: any) => setSelected(value.name)}
        classNames={{
          dropdown:
            'shadow-modal-shadow shadow-[0_0_8px_2px_rgba(0,0,0,0.3)] -mt-2 !py-0',
        }}
        width={144}
        sm
      />
      <Button
        leftSection={<SendHorizonal />}
        onClick={() => {}}
        classNames={{ root: '!rounded-bl-none !rounded-tl-none' }}
        size='compact-xs'
        primary
      />
    </div>
  );
};

export const FooterStatusBar = () => {
  const [selected, setSelected] = useState('My workspace');
  const [userSelected, setUserSelected] = useState('Guest');

  return (
    <StatusBar className="border-t focus-outer2 mt-[50%]">
      <StatusBar.PrimaryRegion>
        <div
          tabIndex={1}
          className="bg-primaryColor text-primaryColor-text w-fit px-3 flex items-center"
          id={'status-bar-firecamp-version'}
          data-tip={`Firecamp`}
        >
          <VscRemote size={12} />
          <span className="pl-1">Firecamp</span>
        </div>
        <div className="bg-focus3 flex items-center px-3">
          <UserCircle2 size={16} className="mr-1" />

          <DropdownMenu
            handler={() => (
              <span className="pl-1 cursor-pointer">{userSelected}</span>
            )}
            options={[
              {
                id: 'heading',
                name: 'Guest',
                isLabel: true,
                postfix: () => (
                  <>
                    <br />
                    <div
                      className={
                        'text-sm font-light leading-3 text-app-foreground-inactive'
                      }
                    >
                      User
                    </div>
                  </>
                ),
              },
              {
                id: 'sign_in',
                name: 'Sign in',
                postfix: () => (
                  <div className={'ml-2 leading-3 text-primaryColor'}>
                    <LogIn size={20} />
                  </div>
                ),
              },
              {
                id: 'create_account',
                name: 'Create an account',
                postfix: () => (
                  <div className={'ml-2 leading-3 text-primaryColor'}>
                    <UserCircle2 size={20} />
                  </div>
                ),
              },
            ]}
            onSelect={(value) => setUserSelected(value.name)}
            classNames={{
              dropdown: '!pt-0 mt-2 min-w-fit	',
              label:
                'flex items-center text-app-foreground px-2 !pt-[0.2rem] !pb-2 !px-3 !block !text-base font-medium leading-6 !opacity-100 !bg-focus2 ',
              item: '!py-1 !px-3',
            }}
            width={150}
            sm
          />
          <ChevronRight size={14} className="mt-0.5" />

          <DropdownMenu
            handler={() => (
              <span className="pl-1 cursor-pointer">{selected}</span>
            )}
            options={[
              {
                id: 'heading',
                name: 'FC Team',
                isLabel: true,
                postfix: () => (
                  <>
                    <br />
                    <div
                      className={
                        'text-sm font-light leading-3 text-app-foreground-inactive'
                      }
                    >
                      Workspace
                    </div>
                  </>
                ),
              },

              {
                id: 'workspace_mgmt',
                name: 'Workspace Management',
                postfix: () => (
                  <div className={'ml-2 leading-3'}>
                    <Plus size={14} strokeWidth={1.5} />
                  </div>
                ),
              },
              {
                id: 'invite_member',
                name: 'Invite Members',
                postfix: () => (
                  <div className={'ml-2 leading-3'}>
                    <Plus size={14} strokeWidth={1.5} />
                  </div>
                ),
              },
              {
                id: 'switch_workspace',
                name: 'Switch Workspace',

                postfix: () => (
                  <div className={'ml-2 leading-3 text-primaryColor'}>
                    <VscRemote size={14} strokeWidth={1.5} />
                  </div>
                ),
              },
              {
                id: 'switch_org',
                name: 'Switch Org',

                postfix: () => (
                  <div className={'ml-2 leading-3 text-primaryColor'}>
                    <VscRemote size={14} strokeWidth={1.5} />
                  </div>
                ),
              },
            ]}
            onSelect={(value) => setSelected(value.name)}
            classNames={{
              dropdown: '!pt-0 mt-2',
              label:
                'flex items-center text-app-foreground px-2 !pt-[0.2rem] !pb-2 !px-3 !block !text-base font-medium leading-6 !opacity-100 !bg-focus2 ',
              item: '!py-1 !px-3',
            }}
            width={180}
            sm
          />
        </div>
      </StatusBar.PrimaryRegion>
      <StatusBar.SecondaryRegion>
        <div className="flex items-center">
          <a className="flex items-center pr-2 " href="#">
            <Twitter
              size={12}
              className="text-statusBar-foreground hover:text-statusBar-foreground-active"
            />
          </a>
          <a className="flex items-center pr-2" href="#">
            <VscGithubInverted
              size={12}
              className="text-statusBar-foreground hover:text-statusBar-foreground-active"
            />
          </a>
          <a className="flex items-center pr-2" href="#">
            <File
              size={12}
              className="text-statusBar-foreground hover:text-statusBar-foreground-active"
            />
          </a>
        </div>
      </StatusBar.SecondaryRegion>
    </StatusBar>
  );
};

export const SidebarCollectionOption = () => {
  const [selected, setSelected] = useState('MyQuery');
  return (
    <DropdownMenu
      handler={() => <MoreHorizontal className="cursor-pointer" />}
      options={[
        {
          prefix: () => <Pencil size={14} />,
          name: 'Rename',
        },
        {
          prefix: () => <Trash2 size={14} />,
          name: 'Delete',
        },
      ]}
      onSelect={(value: any) => setSelected(value.name)}
      classNames={{
        dropdown: 'shadow-modal-shadow shadow-[0_0_8px_2px_rgba(0,0,0,0.3)]',
      }}
      width={144}
      sm
    />
  );
};

export const EnvCollectionOption = () => {
  const [isOpen, toggleOpen] = useState(false);
  const [selected, setSelected] = useState('No Environment');
  return (
    <DropdownMenu
      onOpenChange={(v) => toggleOpen(v)}
      handler={() => (
        <Button
          text={selected}
          classNames={{ root: '!text-info' }}
          rightSection={
            <VscTriangleDown
              size={12}
              className={cx({ 'transform rotate-180': isOpen })}
            />
          }
          size='compact-xs'
          ghost
        />
      )}
      selected={selected || ''}
      options={[
        {
          name: 'Select Environment',
          isLabel: true,
        },
        {
          id: null,
          name: 'No Environment',
        },
        {
          id: 'VWB-N5kGUZisROfbKwyHo',
          name: 'testing',
          showSeparator: true,
        },
        {
          name: 'Create New',
          isLabel: true,
        },
        {
          id: 'fc-new-environment',
          name: 'Create New Environment',
        },
      ]}
      onSelect={(v) => setSelected(v.name)}
      classNames={{
        dropdown: '!pt-0 !pb-2 ',
        label: 'uppercase  ',
        item: '!px-5',
      }}
      sm
    />
  );
};

export const MemberRoleSelection = () => {
  const [selected, setSelected] = useState('Owner');
  const [btnDisable, setBtnDisable] = useState(false);

  return (
    <div className="flex justify-between">
      <DropdownMenu
        handler={() => (
          <Button
            text={selected}
            classNames={{ root: 'hover:!bg-focus1' }}
            ghost
            xs
          />
        )}
        classNames={{
          dropdown: '!py-0',
          label: 'uppercase   !text-start',
        }}
        sm
        options={[
          { name: 'SELECT ROLE', isLabel: true },
          {
            name: 'Owner',
          },
          {
            name: 'Admin',
          },
          {
            name: 'Collaborator',
          },
        ]}
        onSelect={(v) => setSelected(v.name)}
        width={144}
        disabled={btnDisable}
      />
      <Button
        text={
          btnDisable
            ? 'Enable Dropdown Selection'
            : 'Disable Dropdown Selection'
        }
        onClick={() => setBtnDisable((v) => !v)}
      />
    </div>
  );
};
