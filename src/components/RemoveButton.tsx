import { XSquare } from "react-feather";

export default function RemoveButton({
  onClick
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick}>
      <XSquare color="#DE3163" size={18} />
    </button>
  );
}
