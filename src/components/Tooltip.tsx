const Tooltip = ({ data }: PropsType) => {
  return (
    <ul>
      <li>id: {data.id}</li>
      <li>value_area: {data.area}</li>
      <li>value_bar: {data.bar}</li>
    </ul>
  );
};

type PropsType = {
  data: {
    id: string;
    area: number;
    bar: number;
  };
};

export default Tooltip;
