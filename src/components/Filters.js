import classNames from "classnames";
import { useFilteredBreeds } from "../hooks/apiHooks";

export function Filters({ onSelect, selected, query }) {
  const { breeds } = useFilteredBreeds(query);

  return (
    <div className="filter-container">
      <h4>Filters</h4>
      <ul>
        <li
          key="all"
          onClick={() => onSelect("")}
          className={classNames({
            active: !selected,
          })}
        >
          <span>all</span>
        </li>
        {breeds.map(({ breed, subBreeds }) => (
          <li
            key={breed}
            onClick={() => onSelect(breed)}
            className={classNames({
              active: selected === breed,
            })}
          >
            <span>{breed}</span>
            <div>
              <ul>
                {subBreeds.map((subBreed) => (
                  <li
                    key={subBreed}
                    onClick={() => onSelect(`${breed}/${subBreed}`)}
                    className={classNames({
                      active: selected === subBreed,
                    })}
                  >
                    <span>{subBreed}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
