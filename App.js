import {SafeAreaView, StyleSheet, View, Text,TextInput,TouchableOpacity, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = {primary: '#1f145c', white: '#fff'};
import React from 'react';
import MyAppBar from './component/appbar';


const App = () => {
  const [inputText, setInputText] = React.useState('');
  const[Todos, setTodos]= React.useState([]);
  React.useEffect(()=>{
      getTodo
    },[]);
  React.useEffect(()=>{
  SaveInLoacalStorage(Todos);
  },[Todos]);
   
  const IteamList =({todos})=>{
     return <View style={styles.IteamList}>
        <View style={{flex:1}}>
          <Text style={{fontSize:15,fontWeight:'bold',color:'blue',
           textDecorationLine:todos?.completed? 'line-through':'none',
        }}>
            {todos?.task}
            </Text>
            {
               !todos?.task
            }
        </View>
        <TouchableOpacity style={[styles.actionIcon]} onPress={()=>MarkdoneTodo(todos?.id)}>
        <Icon name='done' size={20} color={COLORS.white}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor:'red'}]} onPress={()=>deleteTodo(todos?.id)} >
        <Icon name='delete' size={20} color={COLORS.white}/>
        </TouchableOpacity>
     </View>;
  };
    
  const SaveInLoacalStorage = async todos=>{
      try {
           const stringifyTodos = JSON.stringify(todos);
           await AsyncStorage.setItem('todos',stringifyTodos);
      } catch (error) {
         console.log(error)
      }
  }
   const getTodo =async()=>{
    try {
       const todos = await AsyncStorage.getItem('todos');
       if (todos!=null) {
          setTodos(JSON.parse(todos));
       }
    } catch (error) {
      console.log(error);
    }
   }
  const addTodo =()=>{
      if(inputText===""){
        Alert.alert('Error', 'Please input todo');
      }
      const newTodo={
        id:Math.random(),
        task:inputText,
        completed:false,
      };
      setTodos([...Todos,newTodo]);
      setInputText('');
  };
  
  const MarkdoneTodo = todoId =>{
       const newTodos = Todos.map(item=>{
         if(item.id==todoId){
          return {...item, completed: true};
         }
         return item;
       });
       setTodos(newTodos);
  };

  const deleteTodo = (todoId)=>{
     const newTodo =Todos.filter(item=>item.id !=todoId);
     setTodos(newTodo);
  };

  const clearTodos =()=>{
    Alert.alert("Confirm","Clear todos?",[{
      text:"Yes",
      onPress:()=> setTodos([]),
    },
    {text:'No'},
  ])
    setTodos([]);
  }
  
  return (
    
    <SafeAreaView style={{flex: 1, backgroundColor:'lavender'}}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold',color:'black',fontSize:20}}>TODO-APP</Text>
        <Icon name="delete" size={25} color="red" onPress={clearTodos}/>
      </View>
      <FlatList 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding:20,paddingBottom:100}}
      data={Todos} 
      renderItem={({item})=><IteamList todos={item}/>}
      />
      <View style={styles.footer}>
          <View style={styles.inputContainer}>
             <TextInput
             placeholder="Add Todo"
             value={inputText}
             onChangeText={text=>setInputText(text)}
            />
          </View>
          <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer}>
          <Icon name='add' color={COLORS.white} size={30}/>
        </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles =StyleSheet.create({
  actionIcon:{
     height:25,
     width:25,
     backgroundColor:'green',
     justifyContent:'center',
     alignItems:'center',
     margin:5,
     borderRadius:20,

  },
  IteamList:{
    padding:20,
    backgroundColor:COLORS.white,
    flexDirection:'row',
    elevation:12,
    borderRadius:25,
    marginVertical:10,
    color:'deepskyblue',
    backgroundColor:'paleturquoise'
  },
  header:{
    padding:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'deepskyblue',
    elevation:10
  },
  footer:{
    position:"absolute",
    bottom:0,
    backgroundColor:'aliceblue',
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    backgroundColor:'lavender'
  },
  inputContainer:{
     backgroundColor:COLORS.white,
     elevation:40,
     flex:1,
     height:50,
     marginVertical:20,
     marginRight:20,
     borderRadius:30,
     paddingHorizontal:20,
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor:COLORS.primary,
    borderRadius:25,
    elevation:40,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default App;