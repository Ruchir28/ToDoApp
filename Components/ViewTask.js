import React, { Component } from 'react'
import { View, Text} from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import { DeleteTaskHandler } from '../Actions'
import {h2} from 'react-native-elements'

 class ViewTask extends Component {
     delete=(id)=>{
         this.props.dispatch(DeleteTaskHandler(id))
     }

    render() {
        return (
            <View style={{
               paddingTop:50
              }}>
                  <Text style={{fontSize:20,textAlign:'center',marginBottom:10}}>View All Your Completed Tasks Here</Text>
                 {Object.keys(this.props.tasks).map((id) => (<ListItem
                    key={id}
                    rightIcon={{ name:'trash-alt',type:'font-awesome-5',color:'red' ,size:25 ,reverse:true,onPress:()=>this.delete(id)}}
                    title={this.props.tasks[id].name}
                    subtitle={this.props.tasks[id].priority}
                    bottomDivider
                    
                />
                ))}
            </View>
        )
    }
}

const mapStateToProps = (tasks) => {
    let ans = {}

    Object.keys(tasks).filter((id) => tasks[id].completed).map((id) => {
        ans = {
            ...ans,
            [id]: tasks[id]
        }
    }
    )
    return {
        tasks: ans,
    }
}



export default connect(mapStateToProps)(ViewTask);
