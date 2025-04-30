import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconSun from 'react-native-vector-icons/FontAwesome5';
import { Text, View, StyleSheet, SafeAreaView, Button, Image, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const COLORS = {primary: '#1f145c', white: '#fff'};

const App = () => {

    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState(colorScheme); // Add state for the theme
    const [mounted, setMounted] = useState(false);
    const [addnewTextInput, removeTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([])
  useEffect(() => {
    saveToUserDevice();
  }, [todos])
  useEffect(() => {
    getTodosFromUserDevice();
    setMounted(true);
  }, [])
    const getBackgroundColor = () => {
        return theme === 'dark' ? '#000' : '#fff'; // Changed to #000 for dark background
    }
const textColor = theme === 'dark' ? 'white' : 'black';
const screenBg = theme === 'dark' ? '#222' : '#f8f8f8';
const screenBgInput = theme === 'dark' ? 'orange' : COLORS.primary;
    const buttonColor = theme === 'dark' ? '#222' : '#000';
    const headertextColor = theme === 'dark' ? '#fff' : COLORS.primary;
    const listItembg = theme === 'dark' ? '#fff': COLORS.primary;
    const absoluteBgClr = theme === 'dark' ? 'orange': COLORS.primary;
    const userText = theme === 'dark' ? 'orange': COLORS.primary;
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        if (mounted) {
            setTheme(colorScheme);
        }
    }, [colorScheme, mounted]);

   const addNewTextInputWithFlating = () => {
     removeTextInput(!addnewTextInput);
   }

const ListItem = ({todo}) => {

  return(
  <View style={[styles.listItems, {backgroundColor: screenBg}]}>
  <View>

    <Text style={[styles.text, {color: userText,textDecorationLine: todo?.completed?'line-through':'none'}]}>
    {todo?.task}
    </Text>
  </View>
  <TouchableOpacity style={{flexDirection: 'row'}}>
      <TouchableOpacity>
      {todo.completed ? <Icon name='check' size={25} color={COLORS.white} style={styles.actionIcon}/>:
      <Icon name='check-box' size={25} onPress={()=>markTodoComplete(todo.id)} color={COLORS.white} style={styles.actionIcon}/>}
      {/*<Icon name='done' size={25} color={COLORS.white} style={styles.actionIcon}/> */}
      </TouchableOpacity>
      <Icon name='delete' size={25} onPress={() => deleteTodo(todo.id)} color={COLORS.white} style={styles.deleteIcon}/>
  </TouchableOpacity>
  </View>
  )
}  

  const getTodosFromUserDevice = async (todos) => { 
  try {
    const todos = await AsyncStorage.getItem('todos');
    if (todos !== null) {
      setTodos(JSON.parse(todos))
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
  }

  const saveToUserDevice = async (todos) => {
    try {
      const jsonTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', jsonTodos);
    }catch (error){
        console.log(error)
    }
  }

    const markTodoComplete = (todoid) => {
    // setDataArr(todos => 
    //   todos.map(item => 
    //     item.id === todoid ? {...item, completed: true} : item
    //     )
    // )
    // Alert.alert(
    //   'Date.now().toString',
    //   JSON.stringify(todos))
    const newTodos = todos.map((item) => {
      if(item.id === todoid){
        return {...item, completed: true}
      }
      return item;
    })
    setTodos(newTodos);
  }  
  
  const addTodo = () => {
    removeTextInput(false);
    if (textInput === '') return
    console.warn(textInput);
    const newTododata ={
      id: Date.now(),
      task: textInput,
      completed: false
    }
    Alert.alert(
      'Date.now().toString',
      JSON.stringify(newTododata))
    setTodos([...todos, newTododata]);
    setTextInput('');
  }
  const deleteTodo = (todoid) => {
    const newTodos = todos.filter(item => item.id != todoid);
    setTodos(newTodos)
  }
  const deleteAllTodo = () => {
    setTodos([])
  }


  return(
    <SafeAreaView style={{flex: 1, backgroundColor: getBackgroundColor() }}>
      <View style={styles.header}>
      <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20, color: headertextColor}}>Todo Task App-</Text>
      <TouchableOpacity>
      {/*<Icon name='delete' size={30} color={COLORS.primary} onPress={deleteAllTodo}/>*/}
      {theme=='dark' ? <IconSun name='sun' size={30} color={'orange'} onPress={toggleTheme}/> : <IconSun name='moon' size={30} color={COLORS.primary} onPress={toggleTheme}/>}


      </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: '70%'}}>
  <FlatList 
    data={todos}
    renderItem={({item}) => <ListItem todo={item} /> }
    contentContainerStyle={{padding: 20, paddinBotom: 0, marginBottom: 0}}
    showVerticalScrollIndicator={false}
  />
      </View>

  {addnewTextInput && <View style={{ width:'100%', height: 70}}>
<View style={{paddingLeft: 10, borderRadius: 30, elevation: 40, width:'70%'}}> 
        <TextInput placeholder='add task' value={textInput} onChangeText={(text) => setTextInput(text)} style={{paddingLeft:20, paddingVertical: 15, color: screenBgInput, borderWidth: 0, borderColor: 'transparent', backgroundColor: screenBg, borderRadius: 15 }} />
        </View>
  </View>}

  <View style={{height: 70, alignItems: 'center', justifyContent: 'center', width: 70, backgroundColor: absoluteBgClr, position: 'absolute', bottom: 30, right: 30, borderRadius: 50}}>
    <TouchableOpacity>
    {addnewTextInput ?
    <Icon name='add-task' size={40} color={COLORS.white} onPress={addTodo}/> :
    <Icon name='add' size={40} color={COLORS.white} onPress={addNewTextInputWithFlating}/>}
    </TouchableOpacity>

  </View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  header: {
    padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  footer: {position: 'absolute', height: '20%', width: '100%', bottom: 0, color: COLORS.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20},
  inputContainer: {
    width: '80%',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 30,
    elevation: 40,
    marginVertical: 40,
    marginRight: 10,
    paddingHorizontal: 40 
  },
  iconContainer: {
    position: 'absolute', bottom: 50, right: 50, height: 150, width: 50, backgroundColor: COLORS.primary, marginRight: 0, paddingRight: 0,borderRadius: 25, justifyContent: 'center', alignItems: 'center'
  },
  iconContainerTwo: {
        position: 'absolute',
        height: 50,
        width: 50,
        backgroundColor: '#007BFF', // You'll need to define COLORS.primary.  I've used a blue as a placeholder.
        marginRight: 0,
        paddingRight: 0,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20, // Add this to position at the bottom
        right: 20, // Add this to position at the right
    },
  listItems: {
    padding: 20,
    flexDirection: 'row', elevation: 12, borderRadius: 12, marginVertical: 10, justifyContent: 'space-between'
  },
  text: {
    fontWeight: '600',
    fontSize: 15,

  },
  actionIcon: {
    height: 25, width:25, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 5
  },
  deleteIcon: {
    height: 25, width:25, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', marginLeft: 10,
    borderRadius: 5
  }


})


export default App;










// import { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const App = () => {
//   const [task, setTask] = useState('');

//   const task1 = {
//     "id": 1,
//     "task": "todo make app",
//     "completed": false
//   }

//   useEffect(() => {
//     setTask(task1.task)
//   }, [])

//   const setData = async () => {
//     await AsyncStorage.setItem("user", "To do task ");
//     getData();
//   }

//   const getData = async () => {
//     const name = await AsyncStorage.getItem("user");
//       setTask(name);
//   }

//   const removeData = async () => {
//     await AsyncStorage.removeItem("user");
//     getData();
//   }

//   return (
//     <View style={styles.container}>
//     <View style={styles.tasksWrapper}>
//       <Text style={styles.sectionTitle}> Today's Tasks </Text>

//       <View style={{paddingTop: 20, marginTop: 20, backgroundColor: "pink"}}>

//       <View style={{backgroundColor:'red', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
//   <Image
//     source={{ uri: 'https://raw.githubusercontent.com/madanpiske3/assets/refs/heads/main/7-pink-bag.png'  }} resizeMode='contain'
//   style={{ width: '13%', height: '130%', marginLeft: 10 }} //  These values are interpreted differently in react native
//   //  You might need to use numbers, and consider the parent container
//   //  See the explanation below
// />
//       <Text style={{ margin: 10}}>

//           Record Youtube Video
//       </Text>
//       </View>      

//       <Button title='set' onPress={setData} />
//       <Button title='get' onPress={getData}/>
//       <Button title='Remove' onPress={removeData}/>
//     </View>
//     </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container:  {flex:1},
//   tasksWrapper: {backgroundColor: '#fff', paddingTop: 80, paddingHorizontal: 20},
//   sectionTitle: {fontSize: 24, fontWeight: "bold"}
// })
// export default App;