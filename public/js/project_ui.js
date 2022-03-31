const panels = document.querySelectorAll(".panel");


var idx = 0;
panels.forEach((panel, index) => {
  panel.addEventListener("click", () => {
    idx = index;  //선택된 panel
    nextPanel(idx)
  });
});

const removeActiveClasses = () => {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
};


function nextPanel(num){
  var panelsLen = panels.length;
  //panels[(idx+1) % panelsLen].click();
  removeActiveClasses();
  console.log(num);
  panels[num % panelsLen].classList.add("active");
  clearInterval(chgInterval);
  chgInterval = null;
  interval();
}

var chgInterval = setInterval(nextPanel, 3500, ++idx);

function interval(){
  if(!chgInterval){
    chgInterval = setInterval(nextPanel, 3500, ++idx);
  }
}
