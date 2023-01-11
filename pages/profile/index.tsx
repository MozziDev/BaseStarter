import useAxios from "../../src/hooks/useUserLogin";
import {apiHost} from "../../src/configs/app";
import {iUserAuthState} from "../../src/interfaces/states/iUserAuthState";
import {connect} from "react-redux";
import ProfileForm from "../../src/components/ProfileForm";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Profile = ({userAuth}: {userAuth: iUserAuthState}) => {
    const url = apiHost+"/api/users/get-user-by-id";
    const { loaded, data }: { loaded: boolean, data: any, error: string} = useAxios(url,"post", {id: userAuth.id});

  return <>
      <Grid container={true} sx={{p:3}} alignContent={"center"} alignItems={"center"}>
          <Grid item={true} xs={12} sm={4}>
              {!loaded && <Box sx={{ width: "100%" }}>
                  <Skeleton sx={{height:"70px"}}/>
                  <Skeleton sx={{height:"70px"}}/>
                  <Skeleton sx={{height:"70px"}}/>
                  <Skeleton sx={{height:"70px"}}/>
                  <Skeleton sx={{height:"70px", width: "150px"}}/>
                  <Skeleton sx={{height:"70px"}}/>
              </Box>
              }
              {
                  data && <ProfileForm data={data.data} />
              }
          </Grid>
      </Grid>
  </>
}
const allStateToProps = function(state:any) {
    return {
        userAuth: state.userAuth,
    }
}

export default connect(allStateToProps)(Profile);