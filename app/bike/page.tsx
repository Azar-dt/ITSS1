"use client";
import Header from "@/components/Header";
import React from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import ProductLayout from "@/components/ProductLayout";
import photoURL1 from './public/bicycle_1.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import {
    Button,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Img = styled('img')({
    // margin: 'auto',
    // display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const page = () => {
    const [text, setText] = useState('');
    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <>
            <Header />
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "100px 100px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    gridGap: "30px 60px",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: 0,
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Typography variant="h4" sx={{ paddingBottom: "16px" }}>
                        バイク予約
                    </Typography>
                    <Grid
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "auto",
                            gridGap: "15px",
                        }}>
                        <FormControl fullWidth>
                            <TextField
                                name="name"
                                // value={loginForm.name}
                                type="text"
                                label="ユーザー名前"
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name="email"
                                // value={loginForm.email}
                                type="text"
                                label="メール"
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name="phone number"
                                type="number"
                                label="電話番号"
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name="password"
                                type="password"
                                label="パスワード"
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="time-start">予約開始時間</InputLabel>
                            <Select
                                labelId="time-start"
                                id="time-start-select"
                                value={age}
                                label="time"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>10:00</MenuItem>
                                <MenuItem value={11}>11:00</MenuItem>
                                <MenuItem value={12}>12:00</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="time-start">予約終了時間</InputLabel>
                            <Select
                                labelId="time-start"
                                id="time-start-select"
                                value={age}
                                label="time"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>10:00</MenuItem>
                                <MenuItem value={11}>11:00</MenuItem>
                                <MenuItem value={12}>12:00</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" type="submit" fullWidth>
                            予約
                        </Button>
                    </Grid>
                </Box>
                <div>
                    <ButtonBase sx={{ width: "400px" }}>
                        <Img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" />
                    </ButtonBase>
                </div>
            </Container >

        </>
    )
}


export default page