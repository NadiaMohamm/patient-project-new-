class routerEngineClass {
    init = () => {

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
        $(".edit-btn").click(onEditClick);
        $(".delete-btn-table").click(deletePatinetFromEditScreen);
    }
}
let myRouterEngineClass = new routerEngineClass();