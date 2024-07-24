import React from 'react'
import { Outlet } from 'react-router-dom'
import ContainerLayoutContainer from './ContainerLayoutContainer'

const ContainerSharedLayout = () => {
  return (
    <ContainerLayoutContainer>
        <Outlet />
    </ContainerLayoutContainer>
  )
}

export default ContainerSharedLayout