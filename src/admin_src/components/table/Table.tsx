import {
  useTable,
  Column,
  TableOptions,
  useSortBy,
  usePagination,
} from "react-table";
import "./table.scss";

export default function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      state: { pageIndex },
      pageCount,
      previousPage,
      nextPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);
    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headergroup) => (
              <tr {...headergroup.getHeaderGroupProps()}>
                {headergroup.headers.map((header) => (
                  <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                    {header.render("Header")}
                    <span>
                      {header.isSorted &&
                        (header.isSortedDesc ? "Decending" : "Ascending")}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              {
                prepareRow(row);
              }

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {showPagination && (
          <div>
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}
