import { useState,useEffect } from 'react';
import { Stack, Typography, Button } from '@mui/material';

export const NewButton = ({label, isActive, onClick}) => {
  useEffect(() => {
    console.log(label)
    console.log(isActive)
  }, [])
  return (
    <Button
      onClick={() => onClick(label)}
      disableRipple
      sx={
        isActive !== label.name ? {
          width: '160px',
          height: '36px',
          borderRadius: '16px',
          background: '#F4F4FD',
          boxShadow: '-6px -6px 30px #FFFFFF, 6px 6px 20px rgba(192, 192, 219, 0.7)',
          fontSize: '12px',
          border: '1px solid rgb(241, 241, 255)' ,
          fontWeight: '500',
          lineHeight: '14.63px',
          // textTransform: 'capitalize',
          color: '#7A7A95',
          marginX: '6px',
        } : 
        {
          width: '160px',
          height: '36px',
          borderRadius: '16px',
          background: '#F4F4FD',
          boxShadow: 'rgba(255, 255, 255, 0.7) -2px -2px 6px, rgba(192, 192, 219, 0.3) 2px 2px 6px, rgb(255, 255, 255) -2px -2px 2px inset, rgba(192, 192, 219, 0.7) 2px 2px 2px inset',
          fontSize: '12px',
          border: '1px solid white' ,
          fontWeight: '500',
          lineHeight: '14.63px',
          // textTransform: 'capitalize',
          color: 'rgb(118, 210, 117)',
          marginX: '6px',
        }
      }
    >
      {label ? label.name : 'ff'}
    </Button>
  )};
export default NewButton;