import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { List, ListItem, ListItemSecondaryAction, IconButton } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const ManualCreateTrip = () => {
    const [tripData, setTripData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        noOfDays: '',
        budget: '',
        traveler: ''
    });

    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

    const handleInputChange = (name, value) => {
        setTripData({ ...tripData, [name]: value });
    };

    useEffect(() => {
        console.log(tripData);
    }, [tripData]);

    const addParticipant = () => {
        if (newParticipant && !participants.includes(newParticipant)) {
            setParticipants([...participants, newParticipant]);
            setNewParticipant('');
        }
    };

    const removeParticipant = (email) => {
        setParticipants(participants.filter(p => p !== email));
    };

    const addExpense = () => {
        if (newExpense.description && newExpense.amount) {
            setExpenses([...expenses, newExpense]);
            setNewExpense({ description: '', amount: '' });
        }
    };

    const removeExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const OnGenerateTrip = () => {
        if (tripData?.noOfDays > 5) {
            console.log('Please enter trip days less than or equal to 5');
            return;
        }
        console.log({
            ...tripData,
            participants,
            expenses,
        });
        // Now, use the collected data for AI-based trip generation
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Create New Trip</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Provide basic trip details and preferences for the AI to generate a customized itinerary...
            </p>

            <div className='mt-20 flex flex-col gap-9'>
                {/* Trip Details */}
                <Input
                    placeholder='Trip Name'
                    value={tripData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <Input
                    placeholder='Trip Description'
                    value={tripData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                />
                <Input
                    type='date'
                    label='Start Date'
                    value={tripData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
                <Input
                    type='date'
                    label='End Date'
                    value={tripData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
                <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                        onChange: (v) => handleInputChange('location', v?.label || '')
                    }}
                />

                <Input
                    placeholder='How many days?'
                    type='number'
                    value={tripData.noOfDays}
                    onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                />
            </div>

            {/* Participants Section */}
            <div className='mt-5'>
                <h2 className='text-xl font-medium'>Invite Participants</h2>
                <Input
                    placeholder='Participant Email'
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                />
                <Button onClick={addParticipant} startIcon={<AddIcon />}>Add Participant</Button>
                <List>
                    {participants.map((email, index) => (
                        <ListItem key={index}>
                            {email}
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => removeParticipant(email)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* Expenses Section */}
            <div className='mt-5'>
                <h2 className='text-xl font-medium'>Initial Expenses</h2>
                <Input
                    placeholder='Expense Description'
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
                <Input
                    placeholder='Amount'
                    type='number'
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
                <Button onClick={addExpense} startIcon={<AddIcon />}>Add Expense</Button>
                <List>
                    {expenses.map((expense, index) => (
                        <ListItem key={index}>
                            {`${expense.description} - $${expense.amount}`}
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => removeExpense(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>

            <div className='my-10 justify-end flex'>
                <Button onClick={OnGenerateTrip}>Generate Trip</Button>
            </div>
        </div>
    );
};

export default ManualCreateTrip;
