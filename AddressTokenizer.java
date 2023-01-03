package Assignment;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AddressTokenizer {
    private static final Pattern APT_PATTERN = Pattern.compile("No\\s(\\d+)");
    private static final Pattern CITY_PATTERN = Pattern.compile("(Kuala Terengganu|Kuala Lumpur|Kajang|Bangi|Damansara|Petaling Jaya|Puchong|Subang Jaya|Cyberjaya|Putrajaya|Mantin|Kuching|Seremban)");
    private static final Pattern STATE_PATTERN = Pattern.compile("(Selangor|Terengganu|Pahang|Kelantan|Melaka|Pulau Pinang|Kedah|Johor|Perlis|Sabah|Sarawak)");
    private static final Pattern POSTCODE_PATTERN = Pattern.compile("(\\d{5})");
    private static final Pattern STREET_PATTERN = Pattern.compile("(Jalan\\s.+|Jln\\s.+|Lorong\\s.+|Persiaran\\s.+)");

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter an address: ");
        String address = scanner.nextLine();
        scanner.close();

        AddressComponents components = tokenize(address);
        System.out.println(components);
    }

    public static AddressComponents tokenize(String address) {
      AddressComponents components = new AddressComponents();
  
      Matcher aptMatcher = APT_PATTERN.matcher(address);
    if (aptMatcher.find()) {
        components.apt = "No " + aptMatcher.group(1);
        address = address.replace(components.apt, "").trim();
    }

    Matcher cityMatcher = CITY_PATTERN.matcher(address);
    if (cityMatcher.find()) {
        components.city = cityMatcher.group(1);
        address = address.replace(components.city, "").trim();
    }

    Matcher stateMatcher = STATE_PATTERN.matcher(address);
    if (stateMatcher.find()) {
        components.state = stateMatcher.group(1);
        address = address.replace(components.state, "").trim();
    }

    Matcher postcodeMatcher = POSTCODE_PATTERN.matcher(address);
    if (postcodeMatcher.find()) {
        components.postcode = postcodeMatcher.group(1);
        address = address.replace(components.postcode, "").trim();
    }

    Matcher streetMatcher = STREET_PATTERN.matcher(address);
    if (streetMatcher.find()) {
        components.street = streetMatcher.group(1).replace(",", "").replace(".", "").trim();
        address = address.replace(components.street, "").trim();
    }

    // Replace multiple whitespaces with a single space
    address = address.replaceAll("[\\s,.]", "");

    if (!address.isEmpty()) {
      components.section = address;
  }

    return components;
  }
  
  private static class AddressComponents {
      String apt;
      String city;
      String state;
      String postcode;
      String street;
      String section;
  
      @Override
      public String toString() {
        return "Output: {" +
        (apt != null ? "apt='" + apt + '\'' : "") +
        (city != null ? ", city='" + city + '\'' : "") +
        (state != null ? ", state='" + state + '\'' : "") +
        (postcode != null ? ", postcode='" + postcode + '\'' : "") +
        (street != null ? ", street='" + street + '\'' : "") +
        (section != null ? ", section='" + section + '\'' : "") +
        "}";
      }
    }
}
  