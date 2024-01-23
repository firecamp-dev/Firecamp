import { useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import cx from 'classnames';
import { VscTriangleDown } from '@react-icons/all-files/vsc/VscTriangleDown';
import DropdownMenu from '../dropdown/DropdownMenu';
import Button from '../buttons/Button';
import { EFirecampThemeVariant } from './FirecampThemeProvider.interfaces';
import { useFCThemeVariantContext } from './FirecampThemeVariantProvider';

const ThemeOptions = [
  {
    name: 'Light Orange',
    value: EFirecampThemeVariant.LightPrimary,
  },
  {
    name: 'Light Green',
    value: EFirecampThemeVariant.LightSecondary,
  },
  {
    name: 'Dark Orange',
    value: EFirecampThemeVariant.DarkPrimary,
  },
  {
    name: 'Dark Green',
    value: EFirecampThemeVariant.DarkSecondary,
  },
];
const FirecampThemeSelector = () => {
  const { value: colorScheme, setValue: toggleColorScheme } =
    useFCThemeVariantContext();
  const { setColorScheme } = useMantineColorScheme();
  const [isOpen, toggleOpen] = useState(false);
  const [activeTheme, updateActiveTheme] = useState<{
    name: string;
    value: EFirecampThemeVariant;
  }>();

  useEffect(() => {
    const activeThemeOption = ThemeOptions.find(
      (t) => t.value === (colorScheme as EFirecampThemeVariant)
    );

    // update the color schema of mantine
    if (activeThemeOption) {
      setColorScheme(
        [
          EFirecampThemeVariant.LightPrimary,
          EFirecampThemeVariant.LightSecondary,
        ].includes(colorScheme)
          ? 'light'
          : 'dark'
      );
    }
    updateActiveTheme(activeThemeOption);
  }, [colorScheme]);

  if (!activeTheme) return <></>;
  return (
    <DropdownMenu
      onOpenChange={(v) => toggleOpen(v)}
      handler={() => (
        <Button
          text={activeTheme.name}
          classNames={{
            root: 'w-[220px]',
            inner: 'flex justify-between w-full',
          }}
          rightSection={
            <VscTriangleDown
              size={12}
              className={cx({ 'transform rotate-180': isOpen })}
            />
          }
          fullWidth
          outline
          sm
        />
      )}
      options={ThemeOptions}
      onSelect={(t) => toggleColorScheme(t.value)}
      width={220}
      classNames={{
        dropdown: 'mt-2',
      }}
    />
  );
};
export default FirecampThemeSelector;
