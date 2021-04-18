import React, { Component } from 'react'
import { View, Text, Picker, Vibration } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Tooltip } from 'react-native-elements';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux'
import { addEntryHandler } from '../Actions';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class AddTask extends Component {

    ONE_SECOND_IN_MS = 1000;
    PATTERN = [
        1 * this.ONE_SECOND_IN_MS,
        2 * this.ONE_SECOND_IN_MS,
        3 * this.ONE_SECOND_IN_MS
    ];

    state = {
        task: '',
        priority: 'High',
        date: new Date(Date.now()),
        show: false,
        mode: 'date',
        time: new Date(Date.now()).getHours(),
        minutes:new Date(Date.now()).getMinutes(),
    }
    onChange = (event, selectedDate) => {
        let currentDate = selectedDate?selectedDate:this.state.date;
        // setShow(Platform.OS === 'ios');
        this.setState(() => ({ date: currentDate, show: false,time:currentDate.getHours(),minutes:currentDate.getMinutes()}));
    };

    onChangeText = (text, val) => {
        if (val === "task") {
            this.setState(() => ({ task: text }))
        }
        else {
            this.setState(() => ({ priority: text }))
        }
    }
    showMode = currentMode => {
        this.setState(() => ({ show: true, mode: currentMode }))
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };

    submit = () => {
        this.props.dispatch(addEntryHandler(this.state.task, this.state.priority,`Due By ${this.state.time}:${this.state.minutes} on ${this.state.date.getDate()}/${this.state.date.getMonth()}/${this.state.date.getFullYear()}`));
        Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()

                    let tomorrow = new Date()
                    tomorrow.setDate(this.state.date.getDate())
                    tomorrow.setMonth(this.state.date.getMonth())
                    tomorrow.setFullYear(this.state.date.getFullYear())
                    tomorrow.setHours(this.state.time)
                    tomorrow.setMinutes(this.state.minutes)
                    tomorrow.setSeconds(5)


                    Notifications.scheduleLocalNotificationAsync(
                        {
                            title: this.state.task,
                            body: "👋 Make Sure U Complete this",
                            ios: {
                                sound: true
                            },
                            android: {
                                sound: true,
                                priority: 'high',
                                sticky: false,
                                vibrate: true
                            }
                        },
                        {
                            time: tomorrow,
                            repeat: 'day',
                        }
                    )
                    //AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
            this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
               <Text h2 style={{fontSize:18,textAlign:'center',marginBottom:10}}>Specify The Task Name,Priority and it's Due Date and time</Text> 
                <Input
                    placeholder='Enter Task Name'
                    leftIcon={{ type: 'font-awesome', size: 32, name: 'plus-square', color: 'green' }}
                    onChangeText={text => this.onChangeText(text, "task")}
                />
                {/* <Input
                    placeholder='Enter Priority'
                    leftIcon={{ type: 'font-awesome', size: 32, name: 'exclamation-circle', color: 'orange' }}
                    onChangeText={text => this.onChangeText(text, "priority")}
                /> */}
                <View style={{flexDirection:"row",marginBottom:20,alignItems:'space-between',justifyContent:'flex-start'}}>
                <View style={{flexDirection:'column'}}>
                <Tooltip popover={<Text>Enter priority for Your Task</Text>}>
                <Icon type='font-awesome' size={32} name='exclamation-circle' color='orange'></Icon>
                </Tooltip>
                {/* <Text style={{alignSelf:'center',textAlign:'center'}}>Select Priority</Text> */}
                </View>
                <View>
                <Picker
                    selectedValue={this.state.priority}
                    style={{ height: 50, width: 340, borderBottomColor: 'red',flex:1 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ priority: itemValue })
                    }>
                    <Picker.Item label="High" value="High" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="Low" value="Low" />
                </Picker>
                </View>
                </View>
                
                <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                <Button onPress={this.showDatepicker} buttonStyle={{marginRight:20,marginBottom:20}} title="Select Due Date" />
                <Button onPress={this.showTimepicker} buttonStyle={{marginBottom:20}} title="Select Time" />
                </View>
                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                    />
                )}
                <Button
                    onPress={this.submit}
                    title="Add Task"
                />
            </View>
        )
    }
}

mapStateToProps = (tasks,{navigation}) => ({
    tasks
})


export default connect(mapStateToProps)(AddTask)
