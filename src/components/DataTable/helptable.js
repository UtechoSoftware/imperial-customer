/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  FileText,
  MoreVertical,
  Edit2,
  Trash,
} from "react-feather";
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardTitle,
  CardHeader,
} from "reactstrap";
import {
  arrowleft2,
  arrowright2,
  filter,
  searchbar,
  searchnormal,
} from "../icons/icon";
import { MdSearch } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { DatePicker } from "antd";

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const Helptable = ({
  setSelectedDate2,
  selectedDate2,
  data,
  loading,
  columns,
  search,
  rowHeading,
  showRow,
  setSearch,
  showFilter,
  setLastId,
  count,
}) => {
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    setSearch(value)
}

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
    setLastId(page?.selected + 1);
  };

  // ** Pagination Previous Component
  const Previous = () => {
    return (
      <Fragment>
        <span>
          <img src={arrowleft2} alt="" />
        </span>
      </Fragment>
    );
  };
  const handleDateChange = (date) => {
    if (moment(date).isValid()) {
      setSelectedDate2(date);
    } else {
      console.error("Invalid date selected!");
    }
  };
  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <span>
          <img src={arrowright2} alt="" />
        </span>
      </Fragment>
    );
  };
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous size={15} />}
      nextLabel={<Next size={15} />}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={count}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm gap-2 ps-3 mt-4"
    />
  );

  return (
    <>
      <Fragment>
        <Card className="border border-white w-full">
          {showRow && (
            <div className="flex items-center justify-between flex-wrap p-3 max-md:gap-3 w-full">
              <div className="flex items-center justify-between flex-wrap p-3 max-md:gap-3 w-full">
                <div className="">
                  <h6 className="plusJakara_semibold text-[#6C7278]">
                    {rowHeading}
                  </h6>
                </div>
                {/* <div className='flex items-center flex-wrap gap-[12px]'>
                                <div className='relative'>
                                    <img src={searchnormal} className='absolute mt-[12px] ms-3' alt="" />
                                    <Input
                                        className='dataTable-filter ps-5 md:pe-5 py-[8px] w-full'
                                        type='text'
                                        placeholder='Search anything here'
                                        id='search-input-1'
                                        value={searchValue}
                                        onChange={handleFilter}
                                    />
                                </div>
                                {showFilter && (
                                    <div>
                                        <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                                            <img src={filter} alt="" />
                                            <span className='plusJakara_semibold text_black text-sm'>Filter</span>
                                        </button>
                                    </div>
                                )}
                            </div> */}
                <div className="">
                  <DatePicker
                    value={selectedDate2}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="relative">
                  <img
                    src={searchnormal}
                    className="absolute mt-[12px] ms-3"
                    alt=""
                  />
                  <Input
                    className="dataTable-filter ps-5 md:pe-5 py-[8px] w-full"
                    type="text"
                    placeholder="Search anything here"
                    id="search-input-1"
                    value={search || ""}
                    onChange={handleFilter}
                  />
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-[12px]">
                {/* {showFilter && (
                                    <div>
                                        <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                                            <img src={filter} alt="" />
                                            <span className='plusJakara_semibold text_black text-sm'>Filter</span>
                                        </button>
                                    </div>
                                )} */}
              </div>
            </div>
          )}
          <div className='flex items-center justify-end px-2 py-4 flex-wrap gap-[12px]'>
                                <div className='relative'>
                                    <img src={searchnormal} className='absolute mt-[12px] ms-3' alt="" />
                                    <Input
                                        className='dataTable-filter ps-5 md:pe-2 py-[8px] w-full'
                                        type='text'
                                        placeholder='Search '
                                        id='search-input-1'
                                        value={search || ""}
                                        onChange={handleFilter}
                                    />
                                </div>
                              
                                 
                            </div>
          {loading === true ? (
            <div className="d-flex justify-center pb-5 mt-5 ">
              <CircularProgress className="text_dark" size={20} thickness={2} />
            </div>
          ) : (
            <div className="react-dataTable">
              <DataTable
                noHeader
                pagination
                // selectableRows
                columns={columns}
                paginationPerPage={10}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={data}
                // selectableRowsComponent={BootstrapCheckbox}
              />
            </div>
          )}
        </Card>
      </Fragment>
    </>
  );
};

export default Helptable;
