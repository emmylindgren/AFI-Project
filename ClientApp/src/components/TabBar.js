import React from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    height: '70px',
    position: 'fixed',
    bottom: '0',
    left: '0',
}
const tabIcon = {
    padding: '10px',
}
const deepGreen = '#167F56';
const gray = "#393D3F";
// ActiveTab is what tab is currently colored green.
function TabBar({activeTab}) {

    const navigate = useNavigate()

    const getTabIcons = (activeTab) => {
        let tabs = [getExplore, getSchedule, getWall,getProfile];
        return tabs.map((tab, index) => {
            if(index === activeTab) return tab(deepGreen);
            else return tab(gray);
        })
    }

    const getExplore = color => {
        return (
            <div style={tabIcon} onClick={() =>{navigate('/explore')}}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.7187 10.8674L19.8613 2.00992C17.1744 -0.669974 12.8256 -0.669974 10.1388 2.00992L1.28128 10.8674C0.45816 11.6861 -0.00320588 12.8001 1.67699e-05 13.9611V26.9336C0.00277067 28.6269 1.3755 29.9985 3.0688 29.9999H26.9312C28.6245 29.9985 29.9972 28.6269 29.9999 26.9336V13.9611C30.0032 12.8001 29.5419 11.6861 28.7187 10.8674ZM26.25 26.2499H20V22.2724C20 19.6366 17.8633 17.4999 15.2275 17.4999H14.7725C12.1367 17.4999 10 19.6366 10 22.2724V26.2499H3.75001V13.9611C3.75042 13.7954 3.81593 13.6365 3.93253 13.5187L12.79 4.66117C14.0102 3.4406 15.9889 3.44037 17.2094 4.66058C17.2096 4.66076 17.2098 4.66099 17.21 4.66117L26.0675 13.5187C26.184 13.6365 26.2496 13.7954 26.25 13.9611V26.2499H26.25Z" fill={color}/>
                </svg>
            </div>
        )
    }

    const getSchedule = color => {
        return (
            <div style={tabIcon} onClick={() =>{navigate('/schedule')}}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.125 2.5H22.5V1.875C22.5 1.37772 22.3025 0.900805 21.9508 0.549175C21.5992 0.197544 21.1223 0 20.625 0C20.1277 0 19.6508 0.197544 19.2992 0.549175C18.9475 0.900805 18.75 1.37772 18.75 1.875V2.5H11.25V1.875C11.25 1.37772 11.0525 0.900805 10.7008 0.549175C10.3492 0.197544 9.87228 0 9.375 0C8.87772 0 8.40081 0.197544 8.04917 0.549175C7.69754 0.900805 7.5 1.37772 7.5 1.875V2.5H6.875C5.05164 2.5 3.30295 3.22433 2.01364 4.51364C0.724328 5.80295 0 7.55164 0 9.375L0 23.125C0 24.9484 0.724328 26.697 2.01364 27.9864C3.30295 29.2757 5.05164 30 6.875 30H23.125C24.9484 30 26.697 29.2757 27.9864 27.9864C29.2757 26.697 30 24.9484 30 23.125V9.375C30 7.55164 29.2757 5.80295 27.9864 4.51364C26.697 3.22433 24.9484 2.5 23.125 2.5ZM23.125 26.25H6.875C6.0462 26.25 5.25134 25.9208 4.66529 25.3347C4.07924 24.7487 3.75 23.9538 3.75 23.125V12.5H26.25V23.125C26.25 23.9538 25.9208 24.7487 25.3347 25.3347C24.7487 25.9208 23.9538 26.25 23.125 26.25Z" fill={color}/>
                </svg>
            </div>
        )
    }

    const getProfile = color => {
        return (
            <div style={tabIcon} onClick={() =>{navigate('/profile')}}>
                <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.31591 17.5225C3.98874 18.004 -0.0698124 22.5054 0.000910262 27.8538V28.125C0.000910262 29.1605 0.840383 30 1.87591 30C2.91144 30 3.75091 29.1605 3.75091 28.125V27.7788C3.69454 24.4949 6.11798 21.6945 9.37591 21.2788C12.815 20.9378 15.8793 23.4492 16.2204 26.8883C16.2405 27.0916 16.2507 27.2957 16.2509 27.5V28.125C16.2509 29.1605 17.0904 30 18.1259 30C19.1614 30 20.0009 29.1605 20.0009 28.125V27.5C19.9948 21.9709 15.5076 17.4937 9.97861 17.4998C9.75753 17.5001 9.53652 17.5076 9.31591 17.5225Z" fill={color}/>
                    <path d="M10.001 15C14.1431 15 17.501 11.6421 17.501 7.5C17.501 3.35789 14.1431 0 10.001 0C5.85887 0 2.50098 3.35789 2.50098 7.5C2.50508 11.6404 5.86057 14.9958 10.001 15ZM10.001 3.75C12.072 3.75 13.751 5.42895 13.751 7.5C13.751 9.57105 12.072 11.25 10.001 11.25C7.92992 11.25 6.25098 9.57105 6.25098 7.5C6.25098 5.42895 7.92992 3.75 10.001 3.75Z" fill={color}/>
                </svg>
            </div>
        )
    }

    const getWall = color => {
        return (
            <div style={tabIcon}  onClick={() =>{console.warn('Not yet implemented neighborhood wall!')}}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.7954 2H5.25649C3.45798 2 2 3.45798 2 5.25649V24.7954C2 26.5939 3.45798 28.0519 5.25649 28.0519H24.7954C26.5939 28.0519 28.0519 26.5939 28.0519 24.7954V5.25649C28.0519 3.45798 26.5939 2 24.7954 2Z" stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.3978 19.5389V27.5Z" fill={color}/>
                    <path d="M2.5 10.513H19.0001M27.5 10.5L19.0001 10.513M2.50006 19.5389H19.0001M27.5 19.5389H19.0001M10.1413 2.5V6.25649V10.513M13.3978 19.5389V27.5M19.0001 19.5389V10.513" stroke={color} stroke-width="3.5" stroke-linecap="square" stroke-linejoin="round"/>
                </svg>
            </div>
        )
    }


    return (
        <div style={containerStyle} className='tab-bar'>
            {getTabIcons(activeTab)}
        </div>
        );
}

export default TabBar;