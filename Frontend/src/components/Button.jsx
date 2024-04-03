export const Button = ({label,onPress}) => {
  return (
    <button onClick={onPress} className="bg-black text-white px-4 py-2 border border-white rounded my-2 flex items-center justify-center w-full">{label}</button>
  );
};
