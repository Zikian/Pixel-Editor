var state = {};

function init(w = 40, h = 40, transparency = true, name = "Untitled Document"){
    state.file = document.getElementById("file");
    state.file_dropdown = document.getElementById("dropdown");
    state.clear = document.getElementById("clear-button");
    state.save_as = document.getElementById("save-as");
    state.undo = document.getElementById("undo");
    state.redo = document.getElementById("redo");
    
    state.canvas_area = document.getElementById("canvas-area");
    state.canvas_wrapper = document.getElementById("canvas-wrapper");
    
    state.mouse_indicator = document.getElementById("mouse-indicator");
    hide_mouse_indicator();
    state.selection_size_element = document.getElementById("selection-size");
    state.switch_colors_button = document.getElementById("switch-colors-button");
    state.reset_colors_button = document.getElementById("reset-colors-button");
    
    state.zoom = 8;
    state.prev_zoom = 8;
    
    state.color_picker = new Color_Picker();
    state.color_picker.update_color();
    
    state.new_document_panel = new New_Document_Panel();
    state.main_canvas = new Main_Canvas(w, h);
    state.history_manager = new History_Manager();
    state.preview_canvas = new Preview_Canvas();
    state.palette = new Palette();
    // state.animator = new Animator();
    // state.tiles = new Tiles();
    
    state.tool_options = new Tool_Options();
    state.brush_size = 1;
    
    state.eyedropper_ctx = document.getElementById("eyedropper-canvas").getContext("2d");
    document.getElementById("eyedropper-canvas").width = w;
    document.getElementById("eyedropper-canvas").height = h;
    
    state.transparency = transparency;
    if (!state.transparency){
        state.canvas_wrapper.style.background = "none";
        state.canvas_wrapper.style.backgroundColor = "white";
        state.preview_canvas.canvas.style.background = "none";
        state.preview_canvas.canvas.style.backgroundColor = "white"
    } else {
        state.canvas_wrapper.style.background = "repeating-linear-gradient(135deg, #ffffff, #ffffff 2.5px, #dbdbdb 2.5px, #dbdbdb 5px );";
        state.canvas_wrapper.style.backgroundColor = "transparent";
        state.preview_canvas.canvas.style.background = "repeating-linear-gradient(135deg, #ffffff, #ffffff 2.5px, #dbdbdb 2.5px, #dbdbdb 5px );";
        state.preview_canvas.canvas.style.backgroundColor = "transparent"
    }
    
    state.tool_handler = new Tool_Handler("drawtool");
    
    state.document_name = name;
    state.saved_img = null;
    state.active_element = null;
    
    // Different Mouse Positions
    state.mouse_pos = [0, 0];
    state.pixel_pos = [0, 0];
    state.selection_start = null;
    state.selection_end = null;
    state.delta_pixel_pos = null;
    state.delta_mouse = null;
    state.mouse_start = null;
    state.mouse_end = null;
    
    state.input = {
        ctrl: false,
        shift: false,
        last_shortcut: null,
        space: false
    };
    
    resize_canvas_wrapper();
    resize_mouse_indicator();
    state.canvas_wrapper.style.left = (state.canvas_area.clientWidth - state.canvas_wrapper.clientWidth)/2  + "px";
    state.canvas_wrapper.style.top = (state.canvas_area.clientHeight - state.canvas_wrapper.clientHeight)/2 + "px";
    
    state.selection = new Selection();
    state.selection_canvas = null;
    state.layer_manager = new Layer_Manager(w, h);
    state.layer_settings = new Layer_Settings();
}

init();
