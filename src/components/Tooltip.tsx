const Tooltip = ({ data }: PropsType) => {
  return (
    <ul>
      <li>id: {data.valueId}</li>
      <li>value_area: {data.valueArea}</li>
      <li>value_bar: {data.valueBar}</li>
    </ul>
  );
};

type PropsType = {
  data: {
    valueId: string;
    valueArea: number;
    valueBar: number;
  };
};

export default Tooltip;
