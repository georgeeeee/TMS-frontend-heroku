import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './css/Transaction.css';

export default function SimpleCard() {

    return (
        <Card className="root">
            <CardContent>
                <Typography variant="h5" component="h2" style={{marginBottom: '16px'}}>
                    Transaction1
                </Typography>
                <Typography className="title" color="textSecondary" gutterBottom>
                    CS542 Final Project
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}
