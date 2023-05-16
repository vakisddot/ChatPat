const regex = /[a-zA-Z]/g;

function isNullOrWhitespace(input: string) {
    return (
        typeof input === "undefined" ||
        input == null ||
        input.replace(/\s/g, "").length < 1 ||
        !regex.test(input)
    );
}

export default isNullOrWhitespace;
