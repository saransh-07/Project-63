
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      text : ' ',
      isSearchPressed : false,
      definition : ' ',
      type : ' ',
      word : ' '
    }
  }
  findMeaning=async(word)=>{

    var sWord = word.toLowerCase();                              
    this.setState({word : sWord,
    isSearchPressed : true}); 
 var link ="https://rupinwhitehatjr.github.io/dictionary/"+sWord+".json";
 return await fetch (link)
 .then((data)=>{
   if(data.status===200){
     return data.json();
   }else {
     return null;
   }
 })
 .then ((responseJSON)=>{  
   console.log(responseJSON);
  

   var def = responseJSON.definitions[1].description;
   var typ =  responseJSON.definitions[0].wordtype;
   if(responseJSON){
    this.setState({
      definition : def,
      type : typ,
      word : sWord
    })
   }else {
    this.setState({
      definition :"Not found",
      type : "Not found",
      word : sWord
    })
   }

 })
  }
  render(){        
       
    if ( this.state.isSearchPressed ===false){
        return (
      <View style={styles.container}>
      <Header backgroundColor = 'red' centerComponent = {{text : 'Dictionary', style : {fontSize : 30}}} />
       
     <TextInput style = {styles.inputBox}  onChangeText = {(text) =>{this.setState({text: text, isSearchPressed : false})}} value = {this.state.text}/>  
     <TouchableOpacity style = {styles.button} onPress = {()=>{this.findMeaning(this.state.text)}}><Text style = {styles.text}>GO</Text></TouchableOpacity>
      </View>
    ); 
   }else if (this.state.isSearchPressed===true){
     return(<View style={styles.container}>
      <Header backgroundColor = 'red' centerComponent = {{text : 'Dictionary', style : {fontSize : 30}}} />
     
   <TextInput style = {styles.inputBox}  onChangeText = {(text) =>{this.setState({text: text, isSearchPressed : false})}} value = {this.state.text}/>  
   <TouchableOpacity style = {styles.button} onPress = {()=>{this.findMeaning(this.state.text)}}><Text style = {styles.text}>GO</Text></TouchableOpacity>

<View>
<Text>Word : "{this.state.word}" </Text>                
<Text>Type :{this.state.type}</Text>
<Text>Definiton :{this.state.definition}</Text></View>   
    </View>
     )
       

    }
  }        
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,     
    backgroundColor: '#ffffff',
    marginTop : 100,
    alignItems:'center',
    flexDirection : 'column'

  },
  text : {
    fontSize : 20,
   color : "blue",
   alignSelf : 'center'
  }, 
  inputBox : {
    marginTop: 200,
    width: '80%', 
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
   
  },
  button : {
   backgroundColor : 'green',
   borderWidth : 2,
   alignSelf : 'center',
   marginTop : 50,
   width : '80%'

  }
});
