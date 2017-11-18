//Model
var model = {
  cats: [
    {
      name: "Corporal Kittens",
      image: "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
      count: 0,
      unlocked: true,
      unlockAt: 0,
      phrase: "reporting for duty!"
    },
    {
      name: "Captain Cute",
      image: "https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480",
      count: 0,
      unlocked: false,
      unlockAt: 10,
      phrase: "standing by..."
    },
    {
      name: "General Chaos",
      image: "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
      count: 0,
      unlocked: false,
      unlockAt: 50,
      phrase: "ready for action!"
    },
    {
      name: "Double Trouble",
      image: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
      count: 0,
      unlocked: false,
      unlockAt: 200,
      phrase: "are here to help!"
    },
    {
      name: "Major Trouble",
      image: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58b8af2f_nd001-cat-clicker/nd001-cat-clicker.jpg",
      count: 0,
      unlocked: false,
      unlockAt: 1000,
      phrase: ". Let's finish this!"
    }
  ],
  clicks: 0,
  rank: "Kitten",
  allRanks: {
    0: "Kitten",
    10: "Cub",
    20: "Savannah Cat",
    50: "Ocelot",
    100: "Lynx",
    200: "Puma",
    500: "Cheetah",
    1000: "Leopard",
    2000: "Jaguar",
    5000: "Tiger",
    10000: "Lion"
  },
};

// Controller
var controller = {
  init: function(){
    view.init();
  },
  getCats: function(){
    unlocked = [];
    for (i = 0; i < model.cats.length; i++){
      if (model.cats[i].unlocked){
        unlocked.push(model.cats[i]);
      }
    }
    return unlocked;
  },
  adjustModelCount: function(cat, count){
    model.cats[cat].count = count;
    model.clicks++;
    console.log("Clicks " + model.clicks);
    var originalRank = model.rank;
    for (var i in model.allRanks){
      if (model.clicks >= i){
        model.rank = model.allRanks[i];
      }
    }
    if (originalRank !== model.rank){
      controller.changeRank();
    }
  },
  changeName: function(cat, name){
    model.cats[cat].name = name;
  },
  changeRank: function(){
    view.changeRank();
    for (i = 0; i < model.cats.length; i++){
      if (model.cats[i].unlockAt <= model.clicks && !model.cats[i].unlocked){
        model.cats[i].unlocked = true;
        console.log(model.cats[i].name);
        view.addCat();
      }
    }
    view.updateUnlocks();
  },
  admin: false
};

// View
var view = {
  init: function(){
    var cats = controller.getCats();
    this.conveyorContent = "";
    for(i=0;i<cats.length;i++){
      this.conveyorContent += '<article class="cat-preview" id="cat-';
      this.conveyorContent += i;
      this.conveyorContent +='"><img class="cat-preview-image" src="';
      this.conveyorContent += cats[i].image;
      this.conveyorContent += '" /><h3 class="cat-preview-name">';
      this.conveyorContent += cats[i].name;
      this.conveyorContent += '</h3></article>';
    }
    this.conveyor.innerHTML = this.conveyorContent;

    view.renderDisplay();
    view.updateClicks();
    view.changeRank();
    if(controller.admin){
      this.adminContent = "";
      this.adminContent += '<div id="admin-button">Admin</div>';
      this.admin.innerHTML = this.adminContent;
      this.button = document.getElementById("admin-button");
      this.button.addEventListener("click", function(){
        view.adminContent = "";
        view.adminContent += '<label>New name</label><input id="new-name" type="text" /><button id="submit-button" type="button">Submit</button>';
        view.admin.innerHTML = view.adminContent;
        view.adminSubmit();
      });
    }
    else {
      this.admin.style.display = "none";
    }
    this.addPreviewClick();

  },
  addIterator: function(target){
    console.log("Iterating...");
    target.addEventListener("click", function(){
      view.catCount.innerHTML = parseInt(view.catCount.innerHTML) + 1;
      controller.adjustModelCount(view.cat, parseInt(view.catCount.innerHTML));
      view.updateClicks();
  });},
  assignElements: function(){
    this.catPreview = document.getElementsByClassName("cat-preview");
    this.catImage = document.getElementById("cat-image");
    this.catCount = document.getElementById("cat-count");
  },
  addPreviewClick: function(){
    for (var i = 0; i < this.catPreview.length; i++) {
      this.catPreview[i].addEventListener("click", function(){
        view.cat = event.currentTarget.id[4];
        view.renderDisplay();
      });
    }
  },
  renderDisplay: function(){
    console.log("Rendering display");
    console.log(view.cat);
    console.log(cats);
    var cats = controller.getCats();
    console.log(cats[view.cat].name);
    view.displayContent = "";
    view.displayContent += '<h3 id="cat-name">';
    view.displayContent += cats[view.cat].name;
    view.displayContent += '</h3><img id="cat-image" src="';
    view.displayContent += cats[view.cat].image;
    view.displayContent += '" /><p id="cat-count">';
    view.displayContent += cats[view.cat].count;
    view.displayContent += '</p>';

    view.display.innerHTML = view.displayContent;
    view.assignElements();
    view.addIterator(view.catCount);
    view.addIterator(view.catImage);
  },
  adminSubmit: function(){
    view.submitButton = document.getElementById("submit-button");
    console.log(view.submitButton);
    view.submitButton.addEventListener("click", function(){
      var newName = document.getElementById("new-name");
      console.log(newName.value);
      controller.changeName(view.cat, newName.value);
      view.init();
    }, false);
  },
  updateClicks: function(){
    view.clicks.innerHTML = model.clicks;
  },
  changeRank: function(){
    view.rank.innerHTML = model.rank;
  },
  updateUnlocks: function(){
    view.unlocks.innerHTML = view.unlocksContent;
  },
  addCat: function(){
    var cats = controller.getCats();
    console.log(cats);
    this.conveyorContent = "";
    for(i=0;i<cats.length;i++){
      this.conveyorContent += '<article class="cat-preview" id="cat-';
      this.conveyorContent += i;
      this.conveyorContent +='"><img class="cat-preview-image" src="';
      this.conveyorContent += cats[i].image;
      this.conveyorContent += '" /><h3 class="cat-preview-name">';
      this.conveyorContent += cats[i].name;
      this.conveyorContent += '</h3></article>';
    }
    this.conveyor.innerHTML = this.conveyorContent;
    view.assignElements();
    this.addPreviewClick();
    view.unlocksContent = cats[cats.length - 1].name + " " + cats[cats.length - 1].phrase + "<br>";
  },
  conveyor: document.getElementById("cat-conveyor"),
  conveyorContent: "",
  display: document.getElementById("cat-wrapper"),
  displayContent: "",
  admin: document.getElementById("admin"),
  adminContent: "",
  clicks: document.getElementById("clicks"),
  rank: document.getElementById("rank"),
  unlocks: document.getElementById("unlocks"),
  unlocksContent: "",
  cat: 0
};

controller.init();
