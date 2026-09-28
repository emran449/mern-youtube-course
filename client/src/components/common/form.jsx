import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommonForm = ({ formControls ,formData, setFormData,onSubmit, buttonText }) => {

    function renderInputsByComponentType(getControlItem) {
        // eslint-disable-next-line no-useless-assignment
        let element = null;
        const value = formData[getControlItem.name] || '';
        switch (getControlItem.componentType) {
            case 'input':
                element =( <Input
                name = {getControlItem.name}
                placeholder = {getControlItem.placeholder}
                id = {getControlItem.name}
                type = {getControlItem.type}
                value={value}
                onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
                />
                );
                break;
                  case 'select':
                element =(
                  <Select value={value} onValueChange={(value) => setFormData({ ...formData, [getControlItem.name]: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={getControlItem.placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                      {
                        getControlItem.options &&
                        getControlItem.options.length > 0 ?
                        getControlItem.options.map(optionItem=> <SelectItem key={optionItem.id} value={optionItem.id}>
                          {optionItem.label} 
                        </SelectItem>): null
                      }
                    </SelectContent>
                  </Select>
                );
                break;
                  case 'textarea':
                element =( 
                  <Textarea
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.id}
                    value={value}
                onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
                  />
                );
                break;
        
            default:
                 element =( <Input
                name = {getControlItem.name}
                placeholder = {getControlItem.placeholder}
                id = {getControlItem.name}
                type = {getControlItem.type}
                value={value}
                onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
                />
                );
                break;
        }
        return element;
    }
    
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className='mb-1'>{controlItem.label}</Label>
            {
                renderInputsByComponentType(controlItem)
            }
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full mt-2">{buttonText || "Submit"}</Button>
    </form>
  );
};

export default CommonForm;
// https://youtu.be/_4CPp670fK4?si=GhGmS4Z4tTLMVc2K&t=6277