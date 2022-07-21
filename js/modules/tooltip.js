export default function initTooltip() {
  const tooltips = document.querySelectorAll("[data-tooltip]");

  tooltips.forEach((item) => {
    item.addEventListener("mouseover", onMouseOver);
  });

  function onMouseOver(event) {
    const tooltipBox = criarTooltipBox(this);
    tooltipBox.style.top = event.pageY + "px";
    tooltipBox.style.left = event.pageX + "px";

    onMouseMove.tooltipBox = tooltipBox;
    this.addEventListener("mousennive", onMouseMove);

    function onMouseLeave() {
      tooltipBox.remove();
      this.removeEventListener("mouseleave", onMouseLeave); // para remover o evento do historico de event listener , apenas para ficar mais clean, o codigo fica mais otimizado...
      this.addEventListener("mousemove", onMouseMove);
    }

    this.addEventListener("mouseleave", onMouseLeave);
  }

  const onMouseMove = {
    //Criando uma função de forma diferente, usando um objeto como callback
    handleEvent(event) {
      this.tooltipBox.style.top = event.pageY + 20 + "px"; // + 20 para nao ficar piscando a div..., pq qnd ela passa no mouse ela some, e se colocar +20 n vai pegar
      this.tooltipBox.style.left = event.pageX + 20 + "px"; // + 20 para nao ficar piscando a div...
    },
  };

  function criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    return tooltipBox;
  }
}
