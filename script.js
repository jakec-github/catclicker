//Model
var model = {
  cats: [
    {
      name: "General Chaos",
      image: "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
      count: 0
    },
    {
      name: "Double Trouble",
      image: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
      count: 0
    },
    {
      name: "Chairman Meow",
      image: "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
      count: 0
    },
    {
      name: "Pol Potbelly",
      image: "https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480",
      count: 0
    },
    {
      name: "Tiny Tito",
      image: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58b8af2f_nd001-cat-clicker/nd001-cat-clicker.jpg",
      count: 0
    }
  ]
};

// Controller
var controller = {
  init: function(){
    view.init();
  },
  getCats: function(){
    return model.cats;
  },
  adjustModelCount: function(cat, count){
    model.cats[cat].count = count;
  },
  changeName: function(cat, name){
    model.cats[cat].name = name;
  },
  admin: false
};

var view = {
  init: function(){
    var cats = controller.getCats();
    this.asideContent = "";
    for(i=0;i<cats.length;i++){
      this.asideContent += '<article class="cat-preview" id="cat-';
      this.asideContent += i;
      this.asideContent +='"><img class="cat-preview-image" src="';
      this.asideContent += cats[i].image;
      this.asideContent += '" /><h3 class="cat-preview-name">';
      this.asideContent += cats[i].name;
      this.asideContent += '</h3></article>'
    };
    this.aside.innerHTML = this.asideContent;

    view.renderDisplay();
    if(controller.admin){
      this.adminContent = "";
      this.adminContent += '<div id="admin-button">Admin</div>'
      this.admin.innerHTML = this.adminContent;
      this.button = document.getElementById("admin-button");
      this.button.addEventListener("click", function(){
        view.adminContent = "";
        view.adminContent += '<label>New name</label><input id="new-name" type="text" /><button id="submit-button" type="button">Submit</button>'
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
      console.log(target);
      console.log(view.catCount);
      view.catCount.innerHTML = parseInt(view.catCount.innerHTML) + 1;
      controller.adjustModelCount(view.cat, parseInt(view.catCount.innerHTML));
  })},
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
    };
  },
  renderDisplay: function(){
    console.log("Rendering display")
    var cats = controller.getCats();
    console.log(cats[view.cat].name)
    view.displayContent = "";
    view.displayContent += '<h3 id="cat-name">';
    view.displayContent += cats[view.cat].name;
    view.displayContent += '</h3><img id="cat-image" src="'
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
  aside: document.getElementById("aside"),
  asideContent: "",
  display: document.getElementById("cat-wrapper"),
  displayContent: "",
  admin: document.getElementById("admin"),
  adminContent: "",
  cat: 0
};

controller.init();

// var general_chaos = {
//   name: "General Chaos",
//   image: "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
//   count: 0
// };
//
// var double_trouble = {
//   name: "Double Trouble",
//   image: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
//   count: 0
// };
//
// var chairman_meow = {
//   name: "Chairman Meow",
//   image: "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
//   count: 0
// }
//
// var general_chaos2 = {
//   name: "General Chaos 2",
//   image: "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
//   count: 0
// };
//
// var Tiny Tito = {
//   name: "Tiny Tito",
//   image: "https://d17h27t6h515a5.cloudfront.net/topher/2017/March/58b8af2f_nd001-cat-clicker/nd001-cat-clicker.jpg",
//   count: 0
// };
//
// cats = [general_chaos, double_trouble, chairman_meow, general_chaos2, general_chaos3];
//
// function iterate(target){
//   console.log("Iterating...");
//   target.addEventListener("click", function(){
//     console.log(target);
//     console.log(catCount);
//     catCount.innerHTML = parseInt(catCount.innerHTML) + 1;
//     cats[cat].count = parseInt(catCount.innerHTML);
//   });
// };
//
// var aside = document.getElementById("aside");
// var display = document.getElementById("cat-wrapper");
//
// var asideContent = "";
//
// for(i=0;i<cats.length;i++){
//   asideContent += '<article class="cat-preview" id="cat-';
//   asideContent += i;
//   asideContent +='"><img class="cat-preview-image" src="';
//   asideContent += cats[i].image;
//   asideContent += '" /><h3 class="cat-preview-name">';
//   asideContent += cats[i].name;
//   asideContent += '</h3></article>'
// };
//
// aside.innerHTML = asideContent;
//
// var displayContent = "";
//
// displayContent += '<h3 id="cat-name">';
// displayContent += cats[0].name;
// displayContent += '</h3><img id="cat-image" src="'
// displayContent += cats[0].image;
// displayContent += '" /><p id="cat-count">';
// displayContent += cats[0].count;
// displayContent += '</p>';
//
// var cat = 0;
//
// display.innerHTML = displayContent;
//
// var catPreview = document.getElementsByClassName("cat-preview");
// var catImage = document.getElementById("cat-image");
// var catCount = document.getElementById("cat-count");
//
// for (var i = 0; i < catPreview.length; i++) {
//     catPreview[i].addEventListener("click", function(){
//
//       cat = event.currentTarget.id[4];
//
//       displayContent = "";
//       displayContent += '<h3 id="cat-name">';
//       displayContent += cats[cat].name;
//       displayContent += '</h3><img id="cat-image" src="'
//       displayContent += cats[cat].image;
//       displayContent += '" /><p id="cat-count">';
//       displayContent += cats[cat].count;
//       displayContent += '</p>';
//
//       display.innerHTML = displayContent;
//
//       catImage = document.getElementById("cat-image");
//       catCount = document.getElementById("cat-count");
//       iterate(catImage)
//       iterate(catCount);
//
//     });
// };
//
// iterate(catImage);
// iterate(catCount);
