import TextArea from "antd/es/input/TextArea";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Label from "@/components/Label/Label";
const FoodDetailInfor = () => {
  return (
    <div className="bg-white max-w-2xl w-full p-4 mx-auto">
      <form className="grid md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <Label>Food name</Label>
          <Input type="text"></Input>
        </div>
        <div className="col-span-2">
          <Label>Description</Label>
          <TextArea></TextArea>
        </div>
        <label className="block">
          <Label>Category</Label>

          <Select className="mt-1">
            <option value="-1">– select –</option>
            <option value="ha'apai">Category 1</option>
            <option value="tongatapu">Category 2</option>
            <option value="vava'u">Category 3</option>
          </Select>
        </label>
        <label className="block">
          <Label>Tags</Label>

          <Input type="text" className="mt-1" />
        </label>
        <div className="col-span-2">
          <Label>Food image</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="ps-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FoodDetailInfor;
