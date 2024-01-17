import React from "react";

function CategoryForm({ handlesumit, value, setValue }) {
  return (
    <form onSubmit={handlesumit} className=" pb-2">
      <div className="mb-1 ">
        <input
          type="text"
          class="form-control"
          style={{ width: "400px" }}
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Nueva
      </button>
    </form>
  );
}

export default CategoryForm;
