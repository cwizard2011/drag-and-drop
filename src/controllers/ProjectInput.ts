class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
    this.configure(); // Listen to submit event
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  renderContent() {}
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const isValidTitle: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 5,
      maxLength: 10
    }
    const isValidDescription: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    const isValidPeople: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 10
    }

    const valid = validate(isValidTitle) && validate(isValidDescription) && validate(isValidPeople)
    let isValidMsg='';
    if (!validate(isValidTitle)) {
      isValidMsg += 'Enter valid title with min length=5 and max length=10 \n';
    }
    if (!validate(isValidDescription)) {
      isValidMsg += 'Enter valid description with min length=5 \n'
    }
    if (!validate(isValidPeople)) {
      isValidMsg += 'Enter valid number for people with minimum=1 \n';
    }
    if (!valid) {
      alert(isValidMsg);
      return;
    }
    return [enteredTitle,enteredDescription,+enteredPeople]
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value='';
    this.peopleInputElement.value='';

  }

  @bindHandler
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people)
      this.clearInput();
    }
  }
}