import React, { useEffect, useState } from 'react'
import Helptable from '../../DataTable/helptable';
import { ErrorHandler } from '../errorHandler';
import { getQuestionsById } from '../../api/questions';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit, Edit2, Edit3, Eye } from 'react-feather';
import { Modal } from 'react-bootstrap';
const PreviewQuestions = () => {
    const id = useParams()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState()
  const [findQustion, setFindQustion] = useState(null);
const navigate = useNavigate()
    const [lastId, setLastId] = useState(1);
  const [questions, setquestions] = useState([]);
  const [showModal, setShowModal]=useState(false)
  const handleQuestions=(row)=>{
    setShowModal(true)
    setFindQustion(questions?.find((item) => item?._id === row?._id));
  }
    const columns = [
        {
            name: 'Title',
            selector: (row) => row.title,
            maxWidth: '500px',

            sortable: "true",

        },
        {
            name: 'Options',
            selector: (row) => row.options.join(' , '),
            maxWidth: '200px',

            sortable: "true",

        },
        {
            name: 'Answers',
            selector: (row) => row.answers,
            maxWidth: '160px',
            sortable: "true",

        },
   
        {
            name: "Actions",
            allowoverflow: true,
            maxWidth: "80px",
            cell: (row) => {
              return (
                <div  className="d-flex gap-1">
                 <button
                    data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                        className='rounded-2 p-1'
                        style={{ backgroundColor: '#483F72', color: 'white' }}
                        onClick={()=>handleQuestions(row)}
                    >
                        <Eye size={14} />
                    </button>
                    <button
                    data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                        className='rounded-2 p-1'
                        style={{ backgroundColor: '#483F72', color: 'white' }}
                       onClick={()=>navigate(`/edit-questions/${row?._id}`)}
                    >
                        <Edit size={14} />
                    </button>
                </div>
              );
            },
          },
    ]
    const getData=()=>{
        setLoading(true)
        getQuestionsById(id?.id)
        .then((res) => {
          setquestions(res?.data?.questions);
        setLoading(false)

        })
        .catch((er) => {
          ErrorHandler(er);
        setLoading(false)

        });
    }
    useEffect(() => {
        getData()
      }, [id]);
 console.log(findQustion,"oppp")
  return (
    <main className="min-h-screen lg:container py-5 px-4 mx-auto">
    <div className="flex justify-between max-md:flex-col max-md:gap-3 mb-4 md:items-center w-full">
      <div>
        <h4 className="manrope_bold max-md:text-xl text_black">
          All Questions 
        </h4>
        <h6 className="text_secondary max-md:text-sm manrope_regular">
          Activities that must be monitored in order to maintain buyer
          satisfaction
        </h6>
      </div>
    </div>
          <Helptable
              loading={loading}
              data={questions}
              columns={columns}
              count={lastId}
              setLastId={(e) => {
                  setLastId(e);
                  getData(e);
              }}
          />
           <Modal scrollable className='p-1' show={showModal} onHide={() => setShowModal(false)} >
                    <Modal.Body>
                        <Modal.Header className='border-0 p-0' closeButton >
                        <p className='plusJakara_bold fs-5 m-0'>

                            Question Details
                        </p>
                        </Modal.Header>
    
 
                        {
          findQustion  &&
          <div className="d-flex flex-column pt-3">
          
            <h5 style={{ fontWeight: "bolder", fontSize: "16px" }}>
              {"Q- " + findQustion?.title}
            </h5>
            {findQustion?.options?.map((option, index) => (
              <div key={index} className="d-flex align-items-lg-baseline  gap-2">
                <input
                  type="radio"
                  className=' '
                  name={`option-${findQustion?.title}`}
                  checked={findQustion?.answers === option }
                />
                {option}
                {/* <label style={{ marginLeft: "0.5rem" }}>{`${
                  index + 1
                } - ${option}`}</label> */}
                <div
                  style={{ maxWidth: "20rem", width: "100%" }}
                  className="ps-2"
                >
                  {/* <input  style={{borderBottom:"1px solid black", outline:"none", maxWidth:"18rem",width:"100%"}}   onChange={(e) => handleOptionChange(index, e.target.value)}  defaultValue={option} type="text"/> */}
                </div>
              </div>
            ))}
          </div>
        }


                    </Modal.Body>
                </Modal>
   </main>
  )
}

export default PreviewQuestions
