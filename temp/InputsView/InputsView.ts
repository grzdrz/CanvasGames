/* import View from "../View";
import ModelDataEventArgs from "../../../Events/ModelDataEventArgs";
import ViewManager from "../ViewManager";

class InputsView extends View {
    public valueInputsDOMElements: HTMLInputElement[] = new Array<HTMLInputElement>();

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        super(containerElement, viewManager);

        this.handlerValueInputChange = this.handlerValueInputChange.bind(this);
    }

    public initialize(): void {
        this.build();
        this.update(false);
    }

    public build(): void {
        const modelData = this.viewManager.getModelData();

        this.containerElement.innerHTML = "";
        this.valueInputsDOMElements = [];

        for (let i = 0; i < modelData.values.length; i += 1) {
            const valueInputContainer = document.createElement("div");
            const valueInput = document.createElement("input");
            this.valueInputsDOMElements.push(valueInput);
            const valueInputText = document.createElement("p");

            valueInputContainer.className = `range-slider__input-container range-slider__input-container_${i}`;
            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = `range-slider__input range-slider__input_${i}`;
            valueInput.value = `${modelData.minValue}`;
            valueInputText.className = "range-slider__input-text";
            valueInputText.textContent = `value ${i + 1}`;

            valueInputContainer.append(valueInput);
            valueInputContainer.append(valueInputText);
            this.containerElement.append(valueInputContainer);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }
    }

    public update(neededFullRerender: boolean): void {
        const modelData = this.viewManager.getModelData();

        const { values } = modelData;
        if (neededFullRerender) this.build();
        this.valueInputsDOMElements.forEach((e, i) => {
            e.value = values[i].toString();
        });
    }

    private handlerValueInputChange(): void {
        const modelData = this.viewManager.getModelData();

        const { values } = modelData;
        this.valueInputsDOMElements.forEach((e, i) => {
            const value = Number.parseFloat(e.value);
            values[i] = value;
        });

        this.viewManager.onInputsChange.invoke(new ModelDataEventArgs({ values }));
    }
}

export default InputsView;
 */