import { Select } from "antd";
import { useAllBreeds } from "../hooks/apiHooks";

export function SelectBreed({ onChange, value = [] }) {
  const { breeds, isValidating } = useAllBreeds();

  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{ width: 400 }}
        placeholder="Please select"
        onChange={onChange}
        loading={isValidating}
      >
        {breeds.map(({ breed }) => (
          <Select.Option
            key={breed}
            value={breed}
            disabled={
              value.length > 4 ? (value.includes(breed) ? false : true) : false
            }
          >
            {breed}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
