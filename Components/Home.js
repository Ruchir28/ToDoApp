import React, { Component } from 'react'
import { View, Text,ToastAndroid,ScrollView} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { receiveEntriesHandler, markCompletedHandler } from '../Actions/index'
import { ListItem } from 'react-native-elements'



class Home extends Component {

    state={
        visible:false
    }
    componentDidMount() {
        this.props.dispatch(receiveEntriesHandler());
        console.log('dispatch called');
    }
    done=(id)=>{
        console.log('clicked')
        // this.props.navigation.navigate('ViewTask');
        this.props.dispatch(markCompletedHandler(id));
        this.setState(()=>({visible:true}));
    }
    Toast = ({ visible, message }) => {
        if (visible) {
          ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          return null;
        }
        return null;
      };
      
    render() {
        return (
            <ScrollView  style={{
               flex:1,
            }} >
                <this.Toast visible={this.state.visible} message={'Task Completed'}></this.Toast> 
                {Object.keys(this.props.tasks).map((id) => (<ListItem
                    key={id}
                    leftIcon={{ type: 'font-awesome', size: 32, name: 'exclamation-circle', color: 'red' }}
                    rightIcon={{ name:'check-square',type:'font-awesome',color:'green' ,size:25 ,reverse:true,onPress:()=>this.done(id)}}
                    title={this.props.tasks[id].name}
                    subtitle={this.props.tasks[id].dueby}
                    bottomDivider
                    
                    
                />
                ))}
                {Object.keys(this.props.tasks1).map((id) => (<ListItem
                    key={id}
                    leftIcon={{ type: 'font-awesome', size: 32, name: 'exclamation-circle', color: 'orange' }}
                    rightIcon={{ name:'check-square',type:'font-awesome',color:'green' ,size:25 ,reverse:true,onPress:()=>this.done(id)}}
                    title={this.props.tasks1[id].name}
                    subtitle={this.props.tasks1[id].dueby}
                    bottomDivider
                    
                />
                ))}
                {Object.keys(this.props.tasks2).map((id) => (<ListItem
                    key={id}
                    leftIcon={{ type: 'font-awesome', size: 32, name: 'exclamation-circle', color: 'green' }}
                    rightIcon={{ name:'check-square',type:'font-awesome',color:'green' ,size:25 ,reverse:true,onPress:()=>this.done(id)}}
                    title={this.props.tasks2[id].name}
                    subtitle={this.props.tasks2[id].dueby}
                    bottomDivider
                />
                ))}

            </ScrollView>
        )
    }
}

const mapStateToProps = (tasks) => {
    let ans = {}
    let ans1={}
    let ans2={}

    Object.keys(tasks).filter((id) => !tasks[id].completed && tasks[id].priority==='High').map((id) => {
        ans = {
            ...ans,
            [id]: tasks[id]
        }
    })
    Object.keys(tasks).filter((id) => !tasks[id].completed && tasks[id].priority==='Medium').map((id) => {
        ans1 = {
            ...ans1,
            [id]: tasks[id]
        }
    })
    Object.keys(tasks).filter((id) => !tasks[id].completed && tasks[id].priority==='Low').map((id) => {
        ans2 = {
            ...ans2,
            [id]: tasks[id]
        }
    })
    return {
        tasks: ans,
        tasks1:ans1,
        tasks2:ans2
    }
}

export default connect(mapStateToProps)(Home);
