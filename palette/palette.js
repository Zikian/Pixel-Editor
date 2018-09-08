class Palette{
    constructor(){
        this.colors = null;
        this.width = 8;
        this.height = 4;

        this.wrapper = document.getElementById("palette-wrapper");
        this.wrapper.style.width = this.width * 28 + "px";
        this.wrapper.style.height = this.height * 28 + "px";

        document.getElementById("add-color").onclick = function(){
            state.palette.add_color(state.color_picker.rgb);
            state.history_manager.add_history("add-palette-color", [state.palette.colors[state.palette.colors.length - 1]]);
        }
        document.getElementById("remove-color").onclick = function(){
            state.history_manager.add_history("delete-palette-color", [state.palette.current_color]);
            state.palette.remove_color(state.palette.current_color);
        }
        document.getElementById("palette-settings-cross").onclick = function(){
            document.getElementById("palette-settings").style.display = "none";
        }
        document.getElementById("palette-settings-ok").onclick = function(){
            state.palette.validate_settings();
        }
        document.getElementById("palette-settings-cancel").onclick = function(){
            
        }
        this.width_input = document.getElementById("palette-width-setting");
        this.height_input = document.getElementById("palette-height-setting");
        this.width_input.oninput = function(){ 
            if(this.value > 10) {this.value = 10} 
            var leading_zero = /^0[0-9].*$/;
            if(leading_zero.test(this.value)){
              this.value = parseInt(this.value, 10);
            }
        }
        this.height_input.oninput = function(){ 
            if(this.value > 100) {this.value = 100} 
            var leading_zero = /^0[0-9].*$/;
            if(leading_zero.test(this.value)){
                this.value = parseInt(this.value, 10);
            } 
        }
        this.width_input.onchange = function(){ if(this.value <= 0){ this.value = 1 } }
        this.height_input.onchange = function(){ if(this.value <= 0){ this.value = 1 } }
        this.width_input.onkeydown = function(){ 
            var leading_zero = /^0[0-9].*$/;
            if(leading_zero.test(this.value)){
              this.value = parseInt(this.value, 10);
            }
        }
        this.height_input.onkeydown = function(){
            var leading_zero = /^0[0-9].*$/;
            if(leading_zero.test(this.value)){
              this.value = parseInt(this.value, 10);
            }
        }
        document.getElementById("palette-settings-button").onclick = function(){
            document.getElementById("palette-settings").style.display = "block";
            state.palette.width_input.value = state.palette.width;
            state.palette.height_input.value = state.palette.height;
        }
        
        this.colors = [];
        
        this.add_color([0, 0, 0]);
        this.add_color([255, 255, 255]);

        this.body = document.getElementById("palette-body");
        this.resizer = document.getElementById("palette-resizer");
        this.resizer.onmousedown = set_active_element;
        this.resizer.active_func =  resize_sidebar_window(this);
    }

    validate_settings(){
        if(this.width_input.value == 0) { this.width_input.value = 1 }
        if(this.height_input.value == 0) { this.height_input.value = 1 }
        this.width = this.width_input.value;
        this.height = this.height_input.value;
        this.wrapper.style.width = this.width * 28 + "px";
        this.wrapper.style.height = this.height * 28 + "px";
        this.reposition_colors();
        document.getElementById("palette-settings").style.display = "none";
    }

    add_color(color){
        if(this.colors.find(function(elem){ return rgb(elem.color) == rgb(color); })) { return; }
        if(this.colors.length == this.width * this.height){ return; }
        
        var new_color = document.createElement("div");
        new_color.className = "palette-color";
        new_color.style.backgroundColor = rgb(color);
        
        new_color.color = color;
        new_color.index = this.colors.length;
        new_color.onmousedown = this.change_colors(this);
        
        new_color.style.left = this.get_left(this.colors.length);
        new_color.style.top = this.get_top(this.colors.length, 0);

        this.colors.push(new_color);
        this.wrapper.appendChild(new_color);
    }

    change_colors(owner){
        return function(){
            if(owner.current_color != null){
                owner.set_inactive_styles(owner.current_color)
            }
            owner.current_color = this;
            owner.set_active_styles(this)
            state.color_picker.update_color("palette");
        }
    }

    get_left(index){
        return index % this.width * 28 + "px";
    }

    get_top(index){
        return Math.floor(index / this.width) * 28 + "px";
    }

    remove_color(elem){
        elem.style.outline = "none";
        this.colors.splice(this.colors.indexOf(elem), 1);
        this.wrapper.removeChild(elem)
        this.current_color = null;
        this.reposition_colors();
    }

    set_active_styles(elem){
        var HSL = rgb_to_hsl(elem.color)
        if(HSL[2] > 90 && HSL[1] < 10 || HSL[2] > 90) {
            elem.style.outline = "2px solid black";
        }
        else{
            elem.style.outline = "2px solid white";
        }
    }

    reposition_colors(){
        for(var i = 0; i < this.colors.length; i++){
            this.colors[i].index = i;
            if(i >= this.width * this.height) { 
                this.remove_color(this.colors[i]);
                continue;
            }
            this.colors[i].style.left = this.get_left(i);
            this.colors[i].style.top = this.get_top(i, 0);
        }
    }

    set_inactive_styles(elem){
        elem.style.outline = "none";
    }
}