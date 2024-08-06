/* eslint-disable no-useless-concat */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ProductTable from '../../DataTable/productTable';
import { dataTable } from '../../DataTable/productsData';
import { avatarman, edit2, preview, trash } from '../../icons/icon';
import { StyleSheetManager } from 'styled-components';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { getExams, getGeneralExams, updateGeneralExams } from '../../api/examApi';
import { useNavigate } from 'react-router-dom';
import { Form, Modal } from 'react-bootstrap'

import { Spinner } from 'react-bootstrap';
import { ErrorHandler } from '../errorHandler';
import { message } from 'antd';

const GeneralExam = () => {
    const [noOfQues, setnoOfQues] = useState("");
    const [totalMarks, settotalMarks] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
const navigate=useNavigate()
    const [Exams, setExams] = useState([])
    const [lastId, setLastId] = useState(1);
    const [time, setTime] = useState("");



    const fetchData = async () => {
        
        getGeneralExams().then((res)=>{
            setExams(res?.data?.exam)
            setTime(res?.data?.exam?.time)
            settotalMarks(res?.data?.exam?.total_marks)
            setnoOfQues(res?.data?.exam?.numb_question)
        }
    
        ).catch((err)=>{
    
        })    
    };

    useEffect(() => {
        fetchData();
    }, [lastId]);
    const handleUpdate = async (e) => {
        setIsProcessing(true)
        e.preventDefault();
        const data={
            numb_question:noOfQues,
            time:time,
            total_marks:totalMarks
        }
        updateGeneralExams(data).then((res)=>{
if(res?.data){
    setIsProcessing(false)

    message.success('Updated successfuly')
    navigate('/exam')
}
        }).catch((err)=>{
    setIsProcessing(false)

            ErrorHandler(err)
        })
    }
    return (
        <StyleSheetManager shouldForwardProp={(prop) => !['sortActive'].includes(prop)}>
            <main className="min-h-screen lg:container py-5 px-4 mx-auto">
                <div className="flex flex-col mb-3 w-full">
                    <h2 className='plusJakara_bold text_black'>General Exam</h2>
                    <h6 className="text_secondary plusJakara_regular">Information about your current plan and usages</h6>
                </div>
                <Form onSubmit={handleUpdate}>
                            <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Total Number of Questions
          </Form.Label>
          <Form.Control
            rows={5}
            required
            type="number"
            value={noOfQues}
            onChange={(e) => setnoOfQues(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter no of questions"
          />
        </Form.Group>
        <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Total Marks
          </Form.Label>
          <Form.Control
            rows={5}
            required
            type="number"
            value={totalMarks}
            onChange={(e) => settotalMarks(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter total marks"
          />
        </Form.Group>
        <Form.Group className="shadow_def px-3 mb-3">
          <Form.Label className="plusJakara_semibold text_dark">
            Time(mins)
          </Form.Label>
          <Form.Control
            rows={5}
            required
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ padding: "10px 20px" }}
            className="custom_control rounded-3 shadow-sm plusJakara_regular text_secondarydark bg_white"
            placeholder="Enter time"
          />
        </Form.Group>
                            <div className="flex justify-content-end my-4 w-100">
                                {!isProcessing ? (
                                    <button
                                        // disabled={fileLoading}
                                        type='submit' className="flex justify-center bg_primary py-3 px-2 rounded-3 items-center">
                                        <span className="plusJakara_semibold text_white">Update Exam</span>
                                    </button>
                                ) : (
                                    <button type='button' disabled={isProcessing} className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center">
                                        <CircularProgress size={18} className='text_white' />
                                    </button>
                                )}
                            </div>
                        </Form>
             
            </main>
        </StyleSheetManager>
    )
}

export default GeneralExam;