import { _array } from '@firecamp/utils';

import EnvironmentTable from './EnvironmentTable';
import { ITableRows, TTableApi } from '../primitive/table.interfaces';
import { IEnvironmentTable } from './EnvironmentTable.interfaces';

export default {
  title: 'UI-Kit/Table/EnvironmentTable',
  component: EnvironmentTable,
  argTypes: {},
};

const defaultData = [
  {
    "variable": "variable-1",
    "type": "type-1",
    "initial_value": "initial_value",
    "current_value": "current_value"
},{
  "variable": "variable-2",
  "type": "type-2",
  "initial_value": "initial_value-2",
  "current_value": "current_value-2"
}
]
const Template = ({...args}: IEnvironmentTable<any>) => {
  return (
    <EnvironmentTable
    {...args}
    />
  );
};

export const EnvironmentTableData = Template.bind({});
EnvironmentTableData.args = {
  rows: defaultData,
  onChange: (value: ITableRows) => console.log(`change event`, value),
  onMount: (value: TTableApi) => console.log(`mount event`, value)
};