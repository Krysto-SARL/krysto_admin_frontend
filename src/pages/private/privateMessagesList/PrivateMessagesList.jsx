import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BackButton } from '../../../components/shared/BackButton'
import Spinner from '../../../components/shared/spinner/Spinner'


import { getMessages } from '../../../features/message/messageSlice'

function PrivateMessagesList() {
    const { messages, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.message,
      )

      const dispatch = useDispatch()
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        dispatch(getMessages())
      }, [dispatch, isError, message])
      console.log(messages)
    
      if (isLoading || !messages.data) {
        return <Spinner />
      }
    
      if (isError) {
        return <h3>Une erreur est survenue, merci de réessayer.</h3>
      }
    
  return (
    <>
    <section className="headings">
        <h1>Listes des messages</h1>
    </section>
    
    </>
  )
}

export default PrivateMessagesList