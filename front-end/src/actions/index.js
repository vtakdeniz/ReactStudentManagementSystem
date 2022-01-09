import React from 'react'

export function incrementStudentCount(num) {
    return {
        type:'INCREMENTST',
        payload:num
    }
}

export const decrementStudentCount=(num)=>{
    return {
        type:'DECREMENTST',
        payload:num
    }
}

export function zeroStudentCount(num) {
    return {
        type:'ZEROST',
        payload:num
    }
}

export function incrementTeacherCount(num) {
    return {
        type:'INCREMENTTC',
        payload:num
    }
}

export const decrementTeacherCount=(num)=>{
    return {
        type:'DECREMENTTC',
        payload:num
    }
}

export const zeroTeacherCount=(num)=>{
    return {
        type:'ZEROTC',
        payload:num
    }
}




export function incrementLectureCount(num) {
    return {
        type:'INCREMENTLT',
        payload:num
    }
}

export const decrementLectureCount=(num)=>{
    return {
        type:'DECREMENTLT',
        payload:num
    }
}

export const zeroLectureCount=(num)=>{
    return {
        type:'ZEROLT',
        payload:num
    }
}