import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function Infobox({ title,cases,total }) {
    return (
            <Card>
                <CardContent>
                    <Typography className="infobox__title" color="textSecondary">{title}</Typography>

                    <h2>{cases}</h2>

                    <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>
                </CardContent>
            </Card>
    )
}

export default Infobox
