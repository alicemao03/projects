import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function RecipeReviewCard() {
    const [unselected, selected] = React.useState(false);

    const filterChipClicked = () => {
        selected(!unselected);
    };

    return (
        <div class='filterbar' style={{ width: '100%', padding: "1%"}}>
            <Stack direction="row" spacing={1}>
                Filter: 
                <Chip label="Birthdays" variant="outlined" style={{ color: selected ? "black" : "white" }} onClick={filterChipClicked}/>
                <Chip label="Logistics" variant="outlined" style={{ color: selected ? "black" : "white" }} onClick={filterChipClicked}/>
                <Chip label="Parties" variant="outlined" style={{ color: selected ? "black" : "white" }} onClick={filterChipClicked}/>
            </Stack>
        </div>
    );
}