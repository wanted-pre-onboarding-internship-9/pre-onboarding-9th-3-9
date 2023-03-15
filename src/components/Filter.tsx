import { Button, ButtonGroup } from '@chakra-ui/react';
import { useContext } from 'react';

import { FilterPropsType, ResponseDataType } from '../common/Types';
import { ContextAPI } from '../hooks/ContextAPI';

function Filter(props: FilterPropsType) {
  const { onClick } = props;
  const value = useContext(ContextAPI);
  const dataId = new Set(value.map((value: ResponseDataType) => value.id));
  const buttonId = Array.from(dataId);
  buttonId.push('');

  return (
    <ButtonGroup spacing='6'>
      {buttonId.map((value: string) => (
        <Button
          colorScheme='purple'
          size='sm'
          key={value}
          onClick={() => onClick(value)}>
          {value}
        </Button>
      ))}
    </ButtonGroup>
  );
}
export default Filter;
