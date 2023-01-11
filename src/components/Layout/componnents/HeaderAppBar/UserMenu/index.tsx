import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {apiHost} from "../../../../../configs/app";
import axiosClient from "../../../../../helpers/axios";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {ToStorage} from "../../../../../services/auth/ToStorage";
import {iUserAuthState} from "../../../../../interfaces/states/iUserAuthState";
import {setUserAuth} from "../../../../../lib/ReduxStore/ActionsCreators/UserAuthActionsCreator";
import {unsetIsLogin} from "../../../../../lib/ReduxStore/ActionsCreators/isLoginActionsCreator";
import {setAccessToken} from "../../../../../lib/ReduxStore/ActionsCreators/AccessTokenActionsCreator";
import {connect} from "react-redux";
import {useRouter} from "next/router";

function UserMenu({userAuth, userAuthReducer, isLogin, accessToken}: {
    userAuth: iUserAuthState,
    userAuthReducer: (value: iUserAuthState)=>void,
    isLogin: ()=>void,
    accessToken: (token: string)=>void
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const route = useRouter();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOutClick = async () => {
        const url = apiHost+"/api/auth/log-out";

        await axiosClient.request({
            data: {
                id: userAuth.id
            },
            method: "post",
            url
        }).then((result)=>{
            if (result.status) {
                const dataToLS = new ToStorage(isLogin, userAuthReducer, accessToken);
                dataToLS.logOut();
            }
        })
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={async () => await route.push("/profile")}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogOutClick}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

const allStateToProps = function(state:any) {
    return {
        userAuth: state.userAuth,
    }
}

const allReducer = {
    userAuthReducer:(value: iUserAuthState) => (setUserAuth(value)),
    isLogin: ()=>(unsetIsLogin()),
    accessToken: (value: string)=>( setAccessToken(value) )
}

export default connect(allStateToProps,allReducer)(UserMenu);