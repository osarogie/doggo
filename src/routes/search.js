import { Button, Col, Pagination, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Filters } from "../components/Filters";
import { SelectBreed } from "../components/SelectBreed";
import { handleSearchRequest } from "../lib/search";
import "../stylesheets/search.css";

const PAGE_SIZE = 12;

export default function Search() {
  const [query, setQuery] = useState([]);
  const [filter, setFilter] = useState("");
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    totalPages: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  const canFilter = !!query.length;

  const onSearch = useCallback(
    async (_event, searchFilter = filter) => {
      setIsLoading(true);

      const results = await handleSearchRequest({
        query,
        filter: searchFilter,
        canFilter,
      }).finally(() => setIsLoading(false));

      const dogs = results.map((imageUrl) => {
        const [breed, subBreed] = imageUrl.split("/")[4].split("-");
        return {
          id: imageUrl,
          imageUrl,
          breed,
          subBreed,
        };
      });

      setDogs(dogs);
      setPagination({
        minIndex: 0,
        maxIndex: PAGE_SIZE,
      });
    },
    [canFilter, filter, query]
  );

  const filterDogs = useCallback(
    (filter) => {
      setFilter(filter);
      onSearch(null, filter);
    },
    [onSearch]
  );

  const onPaginate = useCallback((page) => {
    setPagination((pagination) => ({
      ...pagination,
      current: page,
      minIndex: (page - 1) * PAGE_SIZE,
      maxIndex: page * PAGE_SIZE,
    }));
  }, []);

  useEffect(() => {
    setFilter("");
  }, [query]);

  return (
    <>
      <div
        style={{ marginLeft: "auto", marginRight: "auto", display: "table" }}
      >
        <h2>Search</h2>
        <SelectBreed onChange={setQuery} value={query} />
        <Button
          type="primary"
          onClick={onSearch}
          loading={isLoading}
          disabled={isLoading}
        >
          Search
        </Button>
      </div>
      <Row style={{ marginTop: 50 }}>
        {canFilter && (
          <Col span={6}>
            <Filters query={query} onSelect={filterDogs} selected={filter} />
          </Col>
        )}
        <Col
          span={18}
          style={{
            paddingLeft: 20,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Row gutter={[16, 16]} wrap>
            {dogs.map(
              (dog, index) =>
                index >= pagination.minIndex &&
                index < pagination.maxIndex && (
                  <DogItem key={dog.id} dog={dog} />
                )
            )}
          </Row>
          {!!dogs.length && (
            <div className="pagination">
              <Pagination
                onChange={onPaginate}
                total={dogs.length}
                pageSize={PAGE_SIZE}
                current={pagination.current}
                showSizeChanger={false}
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

function DogItem({ dog: { imageUrl, breed, subBreed } }) {
  return (
    <div className="dog-item">
      <img className="thumbnail" src={imageUrl} alt={breed} />
      <div className="divider" />
      <span>
        {breed}
        {!!subBreed && `, ${subBreed}`}
      </span>
    </div>
  );
}
