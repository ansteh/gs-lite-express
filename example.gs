var app = express.app();

function save(request){
  return { task: "passed" };
};

app.get({ task: 'save' }, express.json(save));
