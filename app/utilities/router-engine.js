class routerEngineClass {
    init = () => {
        $(".router-link").click(this.onRouterLinkClick);
    }
    onRouterLinkClick = (e) => {
        var desiredContent = $(e.target).data("target");
        this.navigate(desiredContent);
    }
    navigate = (desiredContent) => {
        this.hideAll();
        $(desiredContent).show();
    }

    hideAll = () => {
        $(".screen").hide();
    }
    showListScreen = () => {
        this.navigate(".patients-list");
        $(".edit-btn").click(this.onRouterLinkClick);
        $(".edit-btn").click(myPatientListClass.onEditClick);
        $(".delete-btn-table").click(myPatientEditClass.deletePatinetFromEditScreen);
    }
}
let myRouterEngineClass = new routerEngineClass();