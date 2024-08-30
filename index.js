#!/usr/bin/env node
//Sheband to exec from outside with writing node before
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;
const sleep = (ms = 2000)=>new Promise((r)=>setTimeout(r,ms));
const total_questions = 4
let count = 0;
const answer_lists = [
  'Interpreted',
  'const',
  'nope, it is not',
  'no...never, what are u taking about?',
];
async function title(){
  const title = 'JS QUIZ';
  figlet(title,(err,data)=>{
  console.log(gradient.pastel.multiline(data));
  });
}
async function welcome(){
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants To Be A JS Wizard? \n'
  );

  await sleep();
  rainbowTitle.start();
  rainbowTitle.stop();
}

async function askName(){
  const answers = await inquirer.prompt({
    name:'player_name',
    type:'input',
    message:'What is your name?\n',
    default(){
      return 'Player';
    }
  });
  playerName = answers.player_name;
  console.log(`\n Welcome ${playerName} to the CLI based QUIZ game.`);

}

async function ques1(){
  const answer= await inquirer.prompt({
    name:'question_1',
    type:'list',
    message:'Is JavaScript is an interpreted or a Compiled language?\n',
    choices:[
      'Interpreted',
      'Compiled',
      'Both',
    ],
  });
  return handleAnswer(answer.question_1 == answer_lists[0]);
}

async function ques2(){
  const answer= await inquirer.prompt({
    name:'question_2',
    type:'list',
    message:'Which keyword we use to create constants in JavaScript? \n',
    choices:[
      'let',
      'var',
      'Nothing just write the name',
      'const',
    ],
  });
  return handleAnswer(answer.question_2 == answer_lists[1]);
}

async function ques3(){
  const answer= await inquirer.prompt({
    name:'question_3',
    type:'list',
    message:'Is JavaScript is a true object oriented language? \n',
    choices:[
      'yes, it is',
      'nope, it is not',
    ],
  });
  return handleAnswer(answer.question_3 == answer_lists[2]);
}
async function ques4(){
  const answer= await inquirer.prompt({
    name:'question_4',
    type:'list',
    message:'Is Java and JavaScript same language? \n',
    choices:[
      'yes',
      'no...never, what are u taking about?',
    ],
  });
  return handleAnswer(answer.question_4 == answer_lists[3]);
}

async function handleAnswer(isCorrect){
  const spinner = createSpinner('Checking your answer sit tight...').start();
  await sleep();
  if(isCorrect){
  count+=1;
    spinner.success({text:`Nice work ${playerName}. That's a correct answer`});
  }
  else{
  count-=1;
    spinner.error({text:`💀💀💀💀 Game Over,you are wrong ${playerName}`});
    winner("Good Work");
    process.exit(1);
  }
}
async function winner(callback){
  console.clear();
  const msg = `${callback} ${playerName}`;
  figlet(msg,(err,data)=>{
  console.log(gradient.pastel.multiline(data));
  });
}
async function result(){
  console.log(
    chalk.yellow( `${playerName}! you won with ${count}/${total_questions} points`));
}


await title();
await welcome();
await askName();
await ques1();
await ques2();
await ques3();
await ques4();
await winner("Congratulations");
await result();
