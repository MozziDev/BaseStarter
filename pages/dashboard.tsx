import {Box, Grid, Typography} from "@mui/material";

const Dashboard = () => {
    return <>
        <Grid container>
            <Grid item={true}>
                <Typography sx={{p: 5}}>Привет</Typography>
            </Grid>
        </Grid>
    </>
}

export default Dashboard;